import { VOLUMES } from '@/lib/spec';

export default function SectionOverview() {
  const rects = VOLUMES.map((v) => {
    const xs = v.poly.map((p) => p[0]);
    const x0 = Math.min(...xs);
    const x1 = Math.max(...xs);
    return { id: v.id, x: x0, w: x1 - x0, top: v.base + v.height, kind: v.kind };
  });
  const section = rects.find((r) => r.id === 'pav-a1')!;
  const sectionX = section.x + section.w / 2;
  const sectionY = 45 - section.top / 2;
  return (
    <figure className="glass rounded-2xl p-3" data-testid="figure-section-overview">
      <svg viewBox="-52 -6 160 62" className="h-auto w-full" role="img" aria-label="Building elevation. The representative wall section is marked on the front pavilion.">
        <line x1="-52" x2="108" y1="45" y2="45" stroke="currentColor" strokeOpacity="0.25" />
        {rects
          .slice()
          .sort((a, b) => b.top - a.top)
          .map((r) => (
            <rect
              key={r.id}
              x={r.x}
              y={45 - r.top}
              width={r.w}
              height={r.top}
              fill={r.kind === 'tower' ? '#c9d2d6' : r.kind === 'pavilion' ? '#d9e0e3' : '#bcc7cc'}
              stroke="#6b7d85"
              strokeWidth="0.4"
            />
          ))}
        <circle cx={sectionX} cy={sectionY} r="6" fill="none" stroke="#0f9db5" strokeWidth="1" strokeDasharray="2 1.5" />
        <circle cx={sectionX} cy={sectionY} r="1.8" fill="#0f9db5" />
        <line x1={sectionX + 6} y1={sectionY} x2={sectionX + 20} y2={sectionY - 14} stroke="#0f9db5" strokeWidth="0.8" />
        <text x={sectionX + 21} y={sectionY - 15} fontSize="5" fill="#0f7a8e" fontFamily="DM Mono, monospace">
          SECTION
        </text>
      </svg>
      <figcaption className="font-data mt-1 hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:block">Representative front-pavilion wall section</figcaption>
    </figure>
  );
}
