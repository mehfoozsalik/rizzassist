const MIN_BMI = 15;
const MAX_BMI = 40;

export function BMIGauge({ bmi }: { bmi: number }) {
  const clamped = Math.max(MIN_BMI, Math.min(MAX_BMI, bmi));
  const pct = (clamped - MIN_BMI) / (MAX_BMI - MIN_BMI);
  const angle = -90 + pct * 180;
  const cx = 100;
  const cy = 100;
  const r = 80;

  const zones = [
    { from: 15, to: 18.5, color: '#60a5fa' },
    { from: 18.5, to: 25, color: '#22c55e' },
    { from: 25, to: 30, color: '#f59e0b' },
    { from: 30, to: 40, color: '#ef4444' },
  ];

  const arcPoint = (bmiVal: number) => {
    const p = (bmiVal - MIN_BMI) / (MAX_BMI - MIN_BMI);
    const a = Math.PI * (1 - p);
    return { x: cx - r * Math.cos(a), y: cy - r * Math.sin(a) };
  };

  return (
    <div className="flex flex-col items-center text-gray-900 dark:text-white">
      <svg width="200" height="120" viewBox="0 0 200 120">
        {zones.map((z) => {
          const start = arcPoint(z.from);
          const end = arcPoint(z.to);
          const largeArc = 0;
          return (
            <path
              key={z.color}
              d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
              fill="none"
              stroke={z.color}
              strokeWidth="14"
              strokeLinecap="butt"
            />
          );
        })}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r - 18) * Math.cos((angle * Math.PI) / 180)}
          y2={cy + (r - 18) * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="currentColor" />
      </svg>
      <p className="-mt-2 text-2xl font-extrabold">{bmi}</p>
      <p className="text-xs text-gray-400 dark:text-white/40">BMI</p>
    </div>
  );
}
