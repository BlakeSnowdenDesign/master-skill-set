import { forwardRef, useMemo } from 'react';
import type { ComponentProps } from 'react';
import * as THREE from 'three';
import { VOLUMES, ROOF_ITEMS, PODIUM_H, offsetPoly, insidePoly, type Pt } from '@/lib/spec';
import { facadeMaterial, getMaterials } from '@/lib/materials';

type GroupProps = Omit<ComponentProps<'group'>, 'ref'>;
const FLAT: [number, number, number] = [-Math.PI / 2, 0, 0];

function toShape(poly: Pt[]) {
  const s = new THREE.Shape();
  poly.forEach(([x, z], i) => (i ? s.lineTo(x, -z) : s.moveTo(x, -z)));
  s.closePath();
  return s;
}
function toPath(poly: Pt[]) {
  const p = new THREE.Path();
  poly.forEach(([x, z], i) => (i ? p.lineTo(x, -z) : p.moveTo(x, -z)));
  p.closePath();
  return p;
}
function slab(outer: Pt[], depth: number, holes: Pt[][] = []) {
  const s = toShape(outer);
  holes.forEach((h) => s.holes.push(toPath(h)));
  return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
}

/* ------------------------------------------------------------------ */
/* Foundation                                                          */
/* ------------------------------------------------------------------ */
export const Foundation = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const mats = getMaterials();
  const data = useMemo(() => {
    const plinths = VOLUMES.filter((v) => v.base === 0).map((v) => ({
      id: v.id,
      main: slab(offsetPoly(v.poly, -1.2), 1.4),
      footing: slab(offsetPoly(v.poly, -2.4), 0.6),
    }));
    const piers: [number, number][] = [];
    VOLUMES.filter((v) => v.base === 0).forEach((v) => {
      const xs = v.poly.map((p) => p[0]);
      const zs = v.poly.map((p) => p[1]);
      const inner = offsetPoly(v.poly, 1.5);
      for (let x = Math.min(...xs) + 2; x <= Math.max(...xs); x += 11) {
        for (let z = Math.min(...zs) + 2; z <= Math.max(...zs); z += 9) {
          if (insidePoly([x, z], inner)) piers.push([x, z]);
        }
      }
    });
    return { plinths, piers, pier: new THREE.CylinderGeometry(0.9, 1.1, 5, 14), cap: new THREE.BoxGeometry(3, 0.8, 3) };
  }, []);

  return (
    <group name="Foundation" ref={ref} {...props}>
      {data.plinths.map((p) => (
        <group key={p.id}>
          <mesh geometry={p.main} material={mats.concrete} position={[0, -1.4, 0]} rotation={FLAT} castShadow receiveShadow />
          <mesh geometry={p.footing} material={mats.concreteDark} position={[0, -2.0, 0]} rotation={FLAT} castShadow receiveShadow />
        </group>
      ))}
      {data.piers.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh geometry={data.cap} material={mats.concreteDark} position={[0, -2.4, 0]} castShadow />
          <mesh geometry={data.pier} material={mats.concreteDark} position={[0, -5.3, 0]} castShadow />
        </group>
      ))}
    </group>
  );
});
Foundation.displayName = 'Foundation';

/* ------------------------------------------------------------------ */
/* Walls                                                               */
/* ------------------------------------------------------------------ */
export const Walls = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const mats = getMaterials();
  const data = useMemo(() => {
    const shells: { id: string; geo: THREE.BufferGeometry; y: number }[] = [];
    const facades: {
      key: string;
      mat: THREE.Material;
      geo: THREE.PlaneGeometry;
      pos: [number, number, number];
      rot: number;
    }[] = [];
    const courts: { geo: THREE.BufferGeometry; y: number }[] = [];

    VOLUMES.forEach((v) => {
      shells.push({ id: v.id, y: v.base, geo: slab(v.poly, v.height, [offsetPoly(v.poly, 0.6)]) });
      const cx = v.poly.reduce((a, p) => a + p[0], 0) / v.poly.length;
      const cz = v.poly.reduce((a, p) => a + p[1], 0) / v.poly.length;
      v.poly.forEach((a, i) => {
        const b = v.poly[(i + 1) % v.poly.length];
        const dx = b[0] - a[0];
        const dz = b[1] - a[1];
        const L = Math.hypot(dx, dz);
        if (L < 1) return;
        let nx = dz / L;
        let nz = -dx / L;
        const mx = (a[0] + b[0]) / 2;
        const mz = (a[1] + b[1]) / 2;
        if ((mx - cx) * nx + (mz - cz) * nz < 0) {
          nx = -nx;
          nz = -nz;
        }
        facades.push({
          key: `${v.id}-${i}`,
          mat: facadeMaterial(v.kind, L, v.height),
          geo: new THREE.PlaneGeometry(L, v.height),
          pos: [mx + nx * 0.06, v.base + v.height / 2, mz + nz * 0.06],
          rot: Math.atan2(nx, nz),
        });
      });
      if (v.court) {
        courts.push({ y: PODIUM_H - 4, geo: slab(offsetPoly(v.court, -0.7), 4, [v.court]) });
      }
    });
    return { shells, facades, courts };
  }, []);

  return (
    <group name="Walls" ref={ref} {...props}>
      {data.shells.map((s) => (
        <mesh key={s.id} geometry={s.geo} material={mats.shell} position={[0, s.y, 0]} rotation={FLAT} castShadow receiveShadow />
      ))}
      {data.facades.map((f) => (
        <mesh key={f.key} geometry={f.geo} material={f.mat} position={f.pos} rotation={[0, f.rot, 0]} castShadow receiveShadow />
      ))}
      {data.courts.map((c, i) => (
        <mesh key={i} geometry={c.geo} material={mats.shell} position={[0, c.y, 0]} rotation={FLAT} castShadow receiveShadow />
      ))}
    </group>
  );
});
Walls.displayName = 'Walls';

/* ------------------------------------------------------------------ */
/* Roof                                                                */
/* ------------------------------------------------------------------ */
export const Roof = forwardRef<THREE.Group, GroupProps>((props, ref) => {
  const mats = getMaterials();
  const data = useMemo(() => {
    const decks = VOLUMES.map((v) => {
      const top = v.base + v.height;
      const outer = offsetPoly(v.poly, -0.35);
      const holes = v.court ? [v.court] : [];
      return {
        id: v.id,
        top,
        deck: slab(outer, 0.5, holes),
        parapet: slab(outer, 1.0, [offsetPoly(outer, 0.7), ...holes]),
        courtRim: v.court ? slab(offsetPoly(v.court, -0.6), 0.8, [v.court]) : null,
        courtFloor: v.court ? slab(offsetPoly(v.court, -0.2), 0.5) : null,
      };
    });
    return { decks, box: new THREE.BoxGeometry(1, 1, 1), cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 16) };
  }, []);

  const matFor = (k: string) => (k === 'glass' ? mats.glass : k === 'strip' ? mats.strip : mats.mech);

  return (
    <group name="Roof" ref={ref} {...props}>
      {data.decks.map((d) => (
        <group key={d.id}>
          <mesh geometry={d.deck} material={mats.membrane} position={[0, d.top, 0]} rotation={FLAT} castShadow receiveShadow />
          <mesh geometry={d.parapet} material={mats.parapet} position={[0, d.top + 0.5, 0]} rotation={FLAT} castShadow receiveShadow />
          {d.courtRim && (
            <mesh geometry={d.courtRim} material={mats.parapet} position={[0, d.top + 0.5, 0]} rotation={FLAT} castShadow receiveShadow />
          )}
          {d.courtFloor && (
            <mesh geometry={d.courtFloor} material={mats.membrane} position={[0, d.top - 4.5, 0]} rotation={FLAT} receiveShadow />
          )}
        </group>
      ))}
      {ROOF_ITEMS.map((it, i) =>
        it.kind === 'stack' ? (
          <mesh key={i} geometry={data.cyl} material={mats.mech} position={it.c} scale={[it.s[0] * 2, it.s[1], it.s[2] * 2]} castShadow />
        ) : (
          <mesh key={i} geometry={data.box} material={matFor(it.kind)} position={it.c} scale={it.s} castShadow receiveShadow />
        ),
      )}
    </group>
  );
});
Roof.displayName = 'Roof';
