import type { BodyShape } from '@/lib/types';
import { SHAPE_METRICS } from '@/lib/bodyShape';

export function ShapeSilhouette({
  shape,
  active = false,
  size = 72,
}: {
  shape: BodyShape;
  active?: boolean;
  size?: number;
}) {
  const { shoulder, waist, hip } = SHAPE_METRICS[shape];
  const cx = 50;
  const points = [
    [cx + 12, 6],
    [cx + shoulder / 2, 16],
    [cx + shoulder * 0.45, 36],
    [cx + waist / 2, 72],
    [cx + hip / 2, 102],
    [cx + 13, 134],
    [cx - 13, 134],
    [cx - hip / 2, 102],
    [cx - waist / 2, 72],
    [cx - shoulder * 0.45, 36],
    [cx - shoulder / 2, 16],
    [cx - 12, 6],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      aria-hidden="true"
      className={active ? 'text-brand-500' : 'text-gray-300'}
    >
      <polygon points={points} fill="currentColor" />
    </svg>
  );
}
