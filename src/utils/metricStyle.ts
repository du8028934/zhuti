export type MetricStyle = "dashed" | "bar" | "ring";

export const METRIC_STYLE_OPTIONS = [
  { value: "ring", label: "圆形" },
  { value: "bar", label: "条形" },
  { value: "dashed", label: "虚线" },
] as const;

export const DEFAULT_METRIC_STYLE: MetricStyle = "dashed";
export const METRIC_STYLE_STORAGE_KEY = "cfsm-luminaplus:metric-style";

export function isMetricStyle(value: unknown): value is MetricStyle {
  return value === "dashed" || value === "bar" || value === "ring";
}

export function normalizeMetricStyle(value: unknown): MetricStyle {
  return isMetricStyle(value) ? value : DEFAULT_METRIC_STYLE;
}
