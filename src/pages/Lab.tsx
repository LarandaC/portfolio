import { useCallback, useEffect, useState } from "react";
import { LAB_MODELS, LAB_SKIES, type LabSky } from "@/components/lab/const/labModels";
import { LabSidebar } from "@/components/lab/LabSidebar";
import { LabViewer } from "@/components/lab/LabViewer";
import { LabModelView, type LoadedModel } from "@/components/lab/LabModelView";
import { LabCompare } from "@/components/lab/LabCompare";
import { LabModelInfo } from "@/components/lab/LabModelInfo";
import { LabAnimationPanel } from "@/components/lab/LabAnimationPanel";
import { LabErrorBoundary } from "@/components/lab/LabErrorBoundary";

/** Dev-only: inspect models, cut animations, compare cats. */
export const Lab = () => {
  const [selected, setSelected] = useState(LAB_MODELS[0].id);
  const [sky, setSky] = useState<LabSky>(LAB_SKIES[1]);
  const [toon, setToon] = useState(true);
  const [loaded, setLoaded] = useState<LoadedModel | null>(null);

  useEffect(() => {
    document.body.classList.remove("intro");
    document.title = "Laboratorio · modelos 3D";
  }, []);

  const select = (id: string) => {
    setLoaded(null);
    setSelected(id);
  };
  const onLoaded = useCallback((model: LoadedModel) => setLoaded(model), []);

  const model = LAB_MODELS.find((m) => m.id === selected);

  return (
    <main className="grid h-svh grid-cols-[260px_1fr_360px] bg-surface max-laptop:grid-cols-1 max-laptop:grid-rows-[auto_60svh_auto] max-laptop:h-auto">
      <LabSidebar selected={selected} onSelect={select} sky={sky} onSky={setSky} toon={toon} onToon={setToon} />

      <section className="min-h-0" aria-label="Vista 3D">
        <LabErrorBoundary key={selected}>
          <LabViewer sky={sky} fitKey={selected}>
            {model ? (
              <LabModelView key={model.id} file={model.file} toon={toon} onLoaded={onLoaded} />
            ) : (
              <LabCompare toon={toon} />
            )}
          </LabViewer>
        </LabErrorBoundary>
      </section>

      <aside className="flex flex-col gap-6 overflow-y-auto border-l border-line p-5">
        {model ? (
          <>
            <div>
              <h2 className="mb-3 text-base font-semibold text-ink">{model.name}</h2>
              <LabModelInfo model={model} stats={loaded?.stats ?? null} />
            </div>
            <div>
              <h2 className="mb-3 text-base font-semibold text-ink">Animaciones</h2>
              {loaded ? (
                <LabAnimationPanel clips={loaded.clips} mixer={loaded.mixer} />
              ) : (
                <p className="text-sm text-muted-ink">Cargando…</p>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 text-sm text-body">
            <h2 className="text-base font-semibold text-ink">Comparar gatos</h2>
            <p>Los gatos aparecen a la misma altura. El que tiene animación la reproduce en loop.</p>
            <p>Arrastra para girar la cámara y usa la rueda para acercarte.</p>
            <p className="text-muted-ink">Selecciona un gato a la izquierda para ver sus datos y recortar sus animaciones.</p>
          </div>
        )}
      </aside>
    </main>
  );
};
