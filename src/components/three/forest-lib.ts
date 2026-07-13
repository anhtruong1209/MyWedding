import * as THREE from "three";

/** Texture ánh sáng toả tròn (tự vẽ bằng canvas — không cần file ngoài). */
export function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,250,220,1)");
  g.addColorStop(0.2, "rgba(255,236,168,0.85)");
  g.addColorStop(0.5, "rgba(255,224,140,0.35)");
  g.addColorStop(1, "rgba(255,220,130,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Hình chiếc lá (cong hai đầu nhọn). */
export function makeLeafGeometry(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, -0.75);
  s.bezierCurveTo(0.55, -0.3, 0.6, 0.4, 0, 0.75);
  s.bezierCurveTo(-0.6, 0.4, -0.55, -0.3, 0, -0.75);
  const g = new THREE.ShapeGeometry(s, 14);
  g.center();
  return g;
}

/** Hình cánh hoa (tròn hơn, một đầu thuôn). */
export function makePetalGeometry(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, -0.6);
  s.bezierCurveTo(0.7, -0.2, 0.7, 0.55, 0, 0.7);
  s.bezierCurveTo(-0.7, 0.55, -0.7, -0.2, 0, -0.6);
  const g = new THREE.ShapeGeometry(s, 14);
  g.center();
  return g;
}

export type Drifter = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  fall: number;
  sway: number;
  swayAmp: number;
  scale: number;
};

export function makeDrifters(count: number, spreadX = 26, spreadY = 26, spreadZ = 12): Drifter[] {
  const arr: Drifter[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: (Math.random() - 0.5) * spreadX,
      y: (Math.random() - 0.5) * spreadY,
      z: (Math.random() - 0.5) * spreadZ,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      sx: (Math.random() - 0.5) * 1.1,
      sy: (Math.random() - 0.5) * 1.1,
      fall: 0.5 + Math.random() * 1.0,
      sway: Math.random() * Math.PI * 2,
      swayAmp: 0.5 + Math.random() * 1.4,
      scale: 0.35 + Math.random() * 0.6,
    });
  }
  return arr;
}
