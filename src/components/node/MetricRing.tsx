import { clsx } from "clsx";

export function MetricRing({
  fraction,
  color,
  size = 68,
  stroke = 6,
  className,
}: {
  fraction: number;
  color: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const clamped = Number.isFinite(fraction) ? Math.max(0, Math.min(1, fraction)) : 0;
  const radius = (size - stroke) / 2 - 1;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped);
  const center = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={clsx("metric-ring-svg", className)}
      width={size}
      height={size}
      aria-hidden
    >
      <circle
        className="metric-ring-track"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        strokeWidth={stroke}
      />
      <circle
        className="metric-ring-fill"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  );
}
