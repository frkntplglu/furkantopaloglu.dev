export type Photo = {
  seed: string;
  width: number;
  height: number;
  alt: string;
  exif: string;
};

export const photos: Photo[] = [
  { seed: "fur-01", width: 1200, height: 1600, alt: "Foggy ridge at dawn", exif: "Sony A7IV · 35mm f/1.4 · ISO 100 · 1/1000s" },
  { seed: "fur-02", width: 1600, height: 1067, alt: "Empty street after rain", exif: "Sony A7IV · 50mm f/1.8 · ISO 400 · 1/250s" },
  { seed: "fur-03", width: 1200, height: 1200, alt: "Concrete stairwell", exif: "Sony A7IV · 24mm f/2.8 · ISO 200 · 1/125s" },
  { seed: "fur-04", width: 1200, height: 1500, alt: "Lone tree in a field", exif: "Sony A7IV · 85mm f/1.8 · ISO 100 · 1/2000s" },
  { seed: "fur-05", width: 1600, height: 1000, alt: "Harbor at blue hour", exif: "Sony A7IV · 35mm f/1.4 · ISO 800 · 1/60s" },
  { seed: "fur-06", width: 1200, height: 1600, alt: "Window light on brick", exif: "Sony A7IV · 50mm f/1.8 · ISO 320 · 1/200s" },
  { seed: "fur-07", width: 1600, height: 1200, alt: "Mountain road", exif: "Sony A7IV · 24-70mm f/2.8 · ISO 100 · 1/500s" },
];
