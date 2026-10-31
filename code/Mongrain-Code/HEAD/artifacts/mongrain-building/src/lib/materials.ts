import * as THREE from 'three';

function rng(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function make(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  draw(g);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function towerTexture() {
  const r = rng(7);
  return make(512, 128, (g) => {
    const band = g.createLinearGradient(0, 0, 0, 46);
    band.addColorStop(0, '#F7F8F6');
    band.addColorStop(1, '#E4E7E6');
    g.fillStyle = band;
    g.fillRect(0, 0, 512, 128);
    g.fillStyle = '#C9CFD1';
    g.fillRect(0, 45, 512, 2);
    g.fillStyle = '#2E3944';
    g.fillRect(0, 47, 512, 70);
    for (let i = 0; i < 4; i++) {
      const x = i * 128;
      if (r() < 0.2) {
        g.fillStyle = '#D9DEDE';
        g.fillRect(x + 4, 49, 120, 66);
        g.fillStyle = '#C7CDCF';
        for (let k = 0; k < 120; k += 6) g.fillRect(x + 4 + k, 49, 1, 66);
      } else {
        const gl = g.createLinearGradient(0, 49, 0, 115);
        gl.addColorStop(0, '#46586A');
        gl.addColorStop(0.5, '#2B3743');
        gl.addColorStop(1, '#222C36');
        g.fillStyle = gl;
        g.fillRect(x + 4, 49, 120, 66);
        g.fillStyle = 'rgba(200,225,240,0.10)';
        g.beginPath();
        g.moveTo(x + 20, 49);
        g.lineTo(x + 54, 49);
        g.lineTo(x + 24, 115);
        g.lineTo(x - 8, 115);
        g.fill();
      }
      g.fillStyle = '#B4BBBE';
      g.fillRect(x, 47, 4, 70);
    }
    g.fillStyle = '#EEF0EF';
    g.fillRect(0, 117, 512, 11);
  });
}

function podiumTexture() {
  return make(512, 512, (g) => {
    g.fillStyle = '#C3CACF';
    g.fillRect(0, 0, 512, 512);
    g.fillStyle = 'rgba(255,255,255,0.28)';
    for (let x = 0; x < 512; x += 16) g.fillRect(x, 0, 2, 512);
    g.fillStyle = '#E8EBEB';
    g.fillRect(0, 0, 512, 40);
    g.fillStyle = '#AEB6BB';
    g.fillRect(0, 40, 512, 3);
    for (const [y0, hh] of [[100, 92], [300, 120]] as const) {
      g.fillStyle = '#34414C';
      g.fillRect(0, y0, 512, hh);
      g.fillStyle = 'rgba(190,215,230,0.12)';
      g.fillRect(0, y0, 512, hh * 0.35);
      g.fillStyle = '#B7BEC2';
      for (let x = 0; x < 512; x += 64) g.fillRect(x, y0, 4, hh);
    }
    g.fillStyle = '#E3E6E6';
    g.fillRect(0, 252, 512, 8);
    g.fillStyle = '#878F95';
    g.fillRect(0, 500, 512, 12);
  });
}

function pavilionTexture() {
  return make(512, 512, (g) => {
    g.fillStyle = '#D2DDE2';
    g.fillRect(0, 0, 512, 512);
    const sheen = g.createLinearGradient(0, 0, 0, 384);
    sheen.addColorStop(0, '#E4ECEF');
    sheen.addColorStop(1, '#BFCDD4');
    g.fillStyle = sheen;
    g.fillRect(0, 0, 512, 384);
    for (let x = 0; x < 512; x += 8) {
      g.fillStyle = x % 16 === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(110,135,148,0.18)';
      g.fillRect(x, 0, 3, 384);
    }
    g.fillStyle = '#F4F6F6';
    for (let k = 0; k <= 3; k++) g.fillRect(0, k * 128 - 3, 512, 7);
    g.fillStyle = '#EEF3F4';
    for (let x = 0; x < 512; x += 64) g.fillRect(x, 0, 3, 384);
    const warm = g.createLinearGradient(0, 388, 0, 512);
    warm.addColorStop(0, '#2B2825');
    warm.addColorStop(0.6, '#6E5638');
    warm.addColorStop(1, '#C99A5A');
    g.fillStyle = warm;
    g.fillRect(0, 388, 512, 124);
    g.fillStyle = '#F2F4F3';
    for (let x = 0; x < 512; x += 64) g.fillRect(x, 388, 6, 124);
    g.fillRect(0, 386, 512, 6);
    g.fillRect(0, 0, 512, 12);
  });
}

export type FacadeKind = 'tower' | 'podium' | 'pavilion';
const bases: Partial<Record<FacadeKind, THREE.Texture>> = {};

export function facadeMaterial(kind: FacadeKind, length: number, height: number) {
  if (!bases[kind]) {
    bases[kind] = kind === 'tower' ? towerTexture() : kind === 'podium' ? podiumTexture() : pavilionTexture();
  }
  const t = bases[kind]!.clone();
  t.needsUpdate = true;
  if (kind === 'tower') t.repeat.set(length / 14.4, height / 3.4);
  else if (kind === 'podium') t.repeat.set(length / 16, height / 9.5);
  else t.repeat.set(length / 16.5, height / 16.5);
  return new THREE.MeshStandardMaterial({
    map: t,
    roughness: kind === 'pavilion' ? 0.38 : 0.6,
    metalness: kind === 'pavilion' ? 0.15 : 0.05,
    envMapIntensity: 0.9,
  });
}

export interface EnvelopeMaterials {
  concrete: THREE.MeshStandardMaterial;
  concreteDark: THREE.MeshStandardMaterial;
  shell: THREE.MeshStandardMaterial;
  membrane: THREE.MeshStandardMaterial;
  parapet: THREE.MeshStandardMaterial;
  mech: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  strip: THREE.MeshStandardMaterial;
}

let cache: EnvelopeMaterials | null = null;
export function getMaterials(): EnvelopeMaterials {
  if (cache) return cache;
  const m = (color: string, roughness: number, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  cache = {
    concrete: m('#B4B1AA', 0.95),
    concreteDark: m('#8F8D88', 0.98),
    shell: m('#E9EBE8', 0.75),
    membrane: m('#D9DBD9', 0.88),
    parapet: m('#F1F2EF', 0.7),
    mech: m('#C6CACB', 0.6, 0.15),
    glass: new THREE.MeshStandardMaterial({ color: '#7FA3B5', roughness: 0.12, metalness: 0.3 }),
    strip: m('#9AA3A8', 0.5, 0.3),
  };
  return cache;
}
