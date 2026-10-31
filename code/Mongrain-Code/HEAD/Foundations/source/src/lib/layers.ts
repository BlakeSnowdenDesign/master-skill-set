export type LayerId = "soil" | "footing" | "wall" | "membrane" | "insulation" | "drainage";

export interface LayerInfo {
  id: LayerId;
  step: string;
  title: string;
  body: string;
  color: string;
}

export const LAYERS: LayerInfo[] = [
  { id: "soil", step: "00", title: "Excavation", body: "Earth cut and retained soil at sub-grade", color: "#d9d6cf" },
  { id: "footing", step: "01", title: "Conventional Footing", body: "Cast-in-place concrete with tieback locations marked", color: "#c9cacb" },
  { id: "wall", step: "02", title: "Berlin Wall/Blindside", body: "Shotcrete retaining wall with preapplied HDPE composite or bentonite panel", color: "#bfc1c3" },
  { id: "membrane", step: "03", title: "Membrane Assembly", body: "Hot-applied, torch, or cold-spray coating (3-4 mm total thickness).", color: "#1747a6" },
  { id: "insulation", step: "04", title: "Protection & Insulation", body: "Rigid foam EPS/XPS adhered over membrane", color: "#2fb35e" },
  { id: "drainage", step: "05", title: "Drainage", body: "Dimple mat composite directing water to perimeter drains", color: "#b9c0c6" },
];

export const TITLE = "Foundation Systems: The Sub-Grade Assembly";
