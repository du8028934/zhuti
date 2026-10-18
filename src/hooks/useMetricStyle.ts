import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_METRIC_STYLE,
  METRIC_STYLE_STORAGE_KEY,
  normalizeMetricStyle,
  type MetricStyle,
} from "@/utils/metricStyle";

const listeners = new Set<() => void>();
let snapshot: MetricStyle = DEFAULT_METRIC_STYLE;
let initialized = false;

function readStored(): MetricStyle {
  try {
    return normalizeMetricStyle(localStorage.getItem(METRIC_STYLE_STORAGE_KEY));
  } catch {
    return DEFAULT_METRIC_STYLE;
  }
}

function writeStored(value: MetricStyle) {
  try {
    localStorage.setItem(METRIC_STYLE_STORAGE_KEY, value);
  } catch {
    // 本机存储不可用时仍保留内存态。
  }
}

function refreshSnapshot() {
  const next = readStored();
  if (snapshot !== next) snapshot = next;
  return snapshot;
}

function emit() {
  for (const listener of listeners) listener();
}

const handleStorage = (event: StorageEvent) => {
  if (event.key === METRIC_STYLE_STORAGE_KEY) {
    refreshSnapshot();
    emit();
  }
};

function subscribe(listener: () => void) {
  const wasEmpty = listeners.size === 0;
  listeners.add(listener);
  if (wasEmpty && typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getSnapshot() {
  if (!initialized) {
    initialized = true;
    refreshSnapshot();
  }
  return snapshot;
}

export function useMetricStyle() {
  const style = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_METRIC_STYLE);

  const setStyle = useCallback((next: MetricStyle) => {
    writeStored(next);
    snapshot = next;
    emit();
  }, []);

  return { style, setStyle };
}
