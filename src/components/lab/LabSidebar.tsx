import { COMPARE_ID, LAB_MODELS, LAB_SKIES, type LabSky } from "./const/labModels";

type LabSidebarProps = {
  selected: string;
  onSelect: (id: string) => void;
  sky: LabSky;
  onSky: (sky: LabSky) => void;
  toon: boolean;
  onToon: (toon: boolean) => void;
};

/** Model list, compare view, time-of-day backdrop and the toon-shading switch. */
export function LabSidebar({ selected, onSelect, sky, onSky, toon, onToon }: LabSidebarProps) {
  const item = (active: boolean) =>
    `w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${active ? "bg-brand text-on-brand" : "text-ink hover:bg-mist"}`;
  const heading = "px-3 pt-4 pb-1 text-[11px] font-semibold tracking-wider text-muted-ink uppercase";

  return (
    <nav className="flex flex-col gap-0.5 overflow-y-auto border-r border-line bg-surface p-3" aria-label="Modelos">
      <h1 className="px-3 pb-1 text-lg font-semibold text-ink">Laboratorio</h1>
      <p className="px-3 text-xs text-muted-ink">Solo en desarrollo · modelos de public/models</p>

      <h2 className={heading}>Gatos</h2>
      <button className={item(selected === COMPARE_ID)} onClick={() => onSelect(COMPARE_ID)}>
        Comparar todos
      </button>
      {LAB_MODELS.filter((m) => m.kind === "cat").map((m) => (
        <button key={m.id} className={item(selected === m.id)} onClick={() => onSelect(m.id)}>
          {m.name} <span className="opacity-70">· {m.author}</span>
        </button>
      ))}

      <h2 className={heading}>Edificios</h2>
      {LAB_MODELS.filter((m) => m.kind === "building").map((m) => (
        <button key={m.id} className={item(selected === m.id)} onClick={() => onSelect(m.id)}>
          {m.name} <span className="opacity-70">· {m.author}</span>
        </button>
      ))}

      <h2 className={heading}>Luz del mundo</h2>
      <div className="grid grid-cols-2 gap-1.5 px-3">
        {LAB_SKIES.map((s) => (
          <button
            key={s.id}
            onClick={() => onSky(s)}
            className={`rounded-lg border px-2 py-1.5 text-xs ${sky.id === s.id ? "border-brand text-ink" : "border-line text-body"}`}
            style={{ background: `linear-gradient(to bottom, ${s.top}33, ${s.bottom}33)` }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className="mt-3 flex cursor-pointer items-center gap-2 px-3 text-sm text-ink">
        <input type="checkbox" checked={toon} onChange={(e) => onToon(e.target.checked)} className="accent-brand" />
        Sombreado toon (estilo del mundo)
      </label>
    </nav>
  );
}
