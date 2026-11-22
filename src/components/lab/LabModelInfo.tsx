import { useEffect, useState } from "react";
import type { LabModel } from "./const/labModels";
import type { ModelStats } from "./three/getModelStats";

type LabModelInfoProps = {
  model: LabModel;
  stats: ModelStats | null;
};

/** File weight, triangles, rig, real size and license of the selected model. */
export function LabModelInfo({ model, stats }: LabModelInfoProps) {
  const [bytes, setBytes] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    setBytes(null);
    fetch(model.file, { method: "HEAD" })
      .then((res) => Number(res.headers.get("content-length")))
      .then((size) => !cancelled && setBytes(size || null))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [model.file]);

  const rows: [string, string][] = [
    ["Peso", bytes ? `${(bytes / 1024).toFixed(0)} KB` : "…"],
    ["Triángulos", stats ? stats.triangles.toLocaleString("es") : "…"],
    ["Mallas", stats ? String(stats.meshes) : "…"],
    ["Esqueleto", stats ? (stats.skinned ? "Sí, se puede animar" : "No, es estático") : "…"],
    [
      "Tamaño real",
      stats
        ? `${stats.size.width.toFixed(2)} × ${stats.size.height.toFixed(2)} × ${stats.size.depth.toFixed(2)} (ancho × alto × fondo)`
        : "…",
    ],
    ["Autor", model.author],
    ["Licencia", model.license],
  ];

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-ink">{label}</dt>
          <dd className="text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
