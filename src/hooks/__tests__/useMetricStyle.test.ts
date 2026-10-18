import { describe, expect, it } from "vitest";
import {
  DEFAULT_METRIC_STYLE,
  isMetricStyle,
  normalizeMetricStyle,
} from "@/utils/metricStyle";

describe("metric style", () => {
  it("accepts the three picker values and falls unknown values back to dashed", () => {
    expect(isMetricStyle("ring")).toBe(true);
    expect(isMetricStyle("bar")).toBe(true);
    expect(isMetricStyle("dashed")).toBe(true);
    expect(isMetricStyle("dot")).toBe(false);
    expect(normalizeMetricStyle("ring")).toBe("ring");
    expect(normalizeMetricStyle("nope")).toBe(DEFAULT_METRIC_STYLE);
    expect(DEFAULT_METRIC_STYLE).toBe("dashed");
  });
});
