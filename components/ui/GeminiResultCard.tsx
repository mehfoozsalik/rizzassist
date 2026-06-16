export function GeminiResultCard({
  title,
  icon,
  items,
  tone = 'default',
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone?: 'default' | 'avoid';
}) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <span className={tone === 'avoid' ? 'text-red-500' : 'text-brand-600'} aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                tone === 'avoid' ? 'bg-red-400' : 'bg-brand-500'
              }`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
