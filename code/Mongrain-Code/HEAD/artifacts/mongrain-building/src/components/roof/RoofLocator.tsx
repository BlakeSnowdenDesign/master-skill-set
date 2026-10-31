import { VOLUMES } from '@/lib/spec';

export default function RoofLocator() {
  const rects = VOLUMES.map((v) => {
    const xs = v.poly.map((p) => p[0]);
    const x0 = Math.min(...xs);
    return { id: v.id, x: x0, w: Math.max(...xs) - x0, top: v.base + v.height, kind: v.kind };
  });
  const tower = rects.filter((r) => r.kind === 'tower').sort((a, b) => b.top - a.top)[0];
  return (
    <figure className="glass rounded-2xl p-3" data-testid="figure-roof-locator">
      <svg viewBox="-52 -6 160 62" className="h-auto w-full" role="img" aria-label="Building elevation. The roof zone is marked on the main tower top.">
        <line x1="-52" x2="108" y1="45" y2="45" stroke="currentColor" strokeOpacity="0.25" />
        {rects
          .slice()
          .sort((a, b) => b.top - a.top)
          .map((r) => (
            <rect key={r.id} x={r.x} y={45 - r.top} width={r.w} height={r.top} fill={r.kind === 'tower' ? '#c9d2d6' : r.kind === 'pavilion' ? '#d9e0e3' : '#bcc7cc'} stroke="#6b7d85" strokeWidth="0.4" />
          ))}
        {tower && (
          <>
            <rect x={tower.x} y={45 - tower.top - 0.6} width={tower.w} height="1.8" fill="#0f9db5" />
            <circle cx={tower.x + tower.w / 2} cy={45 - tower.top} r="6" fill="none" stroke="#0f9db5" strokeWidth="1" strokeDasharray="2 1.5" />
            <line x1={tower.x + tower.w / 2 + 5} y1={45 - tower.top - 4} x2={tower.x + tower.w / 2 + 14} y2={45 - tower.top - 4} stroke="#0f9db5" strokeWidth="0.8" />
            <text x={tower.x + tower.w / 2 + 15} y={45 - tower.top - 2.8} fontSize="5" fill="#0f7a8e" fontFamily="DM Mono, monospace">
              ROOF
            </text>
          </>
        )}
      </svg>
      <figcaption className="font-data mt-1 hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:block">Representative roof location. System not verified.</figcaption>
    </figure>
  );
}
