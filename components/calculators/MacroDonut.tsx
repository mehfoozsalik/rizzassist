const COLORS = { protein: '#f43f5e', carbs: '#22c55e', fats: '#60a5fa' };

function parsePct(v: string): number {
  const n = Number(v.replace('%', '').trim());
  return Number.isFinite(n) ? n : 0;
}

export function MacroDonut({
  macroSplit,
}: {
  macroSplit: { protein: string; carbs: string; fats: string };
}) {
  const segments = [
    { label: 'Protein', value: parsePct(macroSplit.protein), color: COLORS.protein },
    { label: 'Carbs', value: parsePct(macroSplit.carbs), color: COLORS.carbs },
    { label: 'Fats', value: parsePct(macroSplit.fats), color: COLORS.fats },
  ];
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const r = 40;
  const circumference = 2 * Math.PI * r;
  let offsetAccum = 0;

  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90 [&_.track]:stroke-gray-100 dark:[&_.track]:stroke-ink-700">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="14" className="track" />
        {segments.map((s) => {
          const length = (s.value / total) * circumference;
          const dasharray = `${length} ${circumference - length}`;
          const dashoffset = -offsetAccum;
          offsetAccum += length;
          return (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
            />
          );
        })}
      </svg>
      <ul className="space-y-1.5 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
            <span className="text-gray-600 dark:text-white/60">
              {s.label}: <strong className="text-gray-900 dark:text-white">{s.value}%</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
