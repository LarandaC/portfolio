import { useEffect, useRef, useState } from "react";
import { AnimationUtils, LoopRepeat, type AnimationAction, type AnimationClip, type AnimationMixer } from "three";

type Segment = { name: string; start: number; end: number };

type LabAnimationPanelProps = {
  clips: AnimationClip[];
  mixer: AnimationMixer;
};

/** subclip works in frames. */
const FPS = 30;
const SPEEDS = [0.25, 0.5, 1, 1.5];

/** Plays and scrubs clips; marks and loops segments inside a long clip. */
export function LabAnimationPanel({ clips, mixer }: LabAnimationPanelProps) {
  const action = useRef<AnimationAction | null>(null);
  const [clip, setClip] = useState<AnimationClip | null>(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [segmentName, setSegmentName] = useState("Walk");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [copied, setCopied] = useState(false);

  const play = (next: AnimationClip, keepSource = false) => {
    mixer.stopAllAction();
    const nextAction = mixer.clipAction(next);
    nextAction.reset().setLoop(LoopRepeat, Infinity).play();
    nextAction.timeScale = speed;
    nextAction.paused = false;
    action.current = nextAction;
    setPaused(false);
    if (!keepSource) {
      setClip(next);
      setStart(0);
      setEnd(next.duration);
    }
  };

  useEffect(() => {
    setSegments([]);
    if (clips.length) play(clips[0]);
    else action.current = null;
    return () => {
      mixer.stopAllAction();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the model changes
  }, [clips, mixer]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      if (action.current) setTime(action.current.time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!clips.length) {
    return <p className="text-sm text-muted-ink">Este modelo no tiene animaciones.</p>;
  }

  const togglePause = () => {
    if (!action.current) return;
    action.current.paused = !paused;
    setPaused(!paused);
  };

  const changeSpeed = (value: number) => {
    setSpeed(value);
    if (action.current) action.current.timeScale = value;
  };

  const scrub = (value: number) => {
    if (!action.current) return;
    action.current.paused = true;
    setPaused(true);
    action.current.time = value;
    mixer.update(0);
  };

  const loopSegment = () => {
    if (!clip || end <= start) return;
    const sub = AnimationUtils.subclip(clip, `${segmentName} (prueba)`, Math.round(start * FPS), Math.round(end * FPS), FPS);
    play(sub, true);
  };

  const saveSegment = () => {
    if (end <= start) return;
    setSegments((list) => [...list, { name: segmentName.trim() || "Segmento", start, end }]);
  };

  const copySegments = async () => {
    const text = segments
      .map((s) => `{ name: "${s.name}", start: ${s.start.toFixed(2)}, end: ${s.end.toFixed(2)} },`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the list stays on screen.
    }
  };

  const duration = action.current?.getClip().duration ?? clip?.duration ?? 0;
  const btn = "rounded-lg border border-line px-2.5 py-1 text-xs text-ink hover:bg-mist disabled:opacity-40";

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-wrap gap-1.5">
        {clips.map((c) => (
          <button
            key={c.uuid}
            className={`${btn} ${clip === c ? "border-brand bg-brand/10" : ""}`}
            onClick={() => play(c)}
          >
            {c.name || "(sin nombre)"} · {c.duration.toFixed(2)} s
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button className={btn} onClick={togglePause}>
            {paused ? "▶ Reproducir" : "❚❚ Pausar"}
          </button>
          <span className="font-mono text-xs text-body tabular-nums">
            {time.toFixed(2)} s / {duration.toFixed(2)} s
          </span>
          <span className="ml-auto flex gap-1">
            {SPEEDS.map((s) => (
              <button key={s} className={`${btn} ${speed === s ? "border-brand bg-brand/10" : ""}`} onClick={() => changeSpeed(s)}>
                {s}×
              </button>
            ))}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={Math.min(time, duration)}
          onChange={(e) => scrub(Number(e.target.value))}
          className="w-full accent-brand"
          aria-label="Línea de tiempo"
        />
      </div>

      <fieldset className="flex flex-col gap-2 rounded-xl border border-line p-3">
        <legend className="px-1 text-xs font-semibold text-ink">Segmentos dentro del clip</legend>
        <p className="text-xs text-muted-ink">
          Pausa donde empieza un movimiento, marca inicio; donde termina, marca fin. Pruébalo en loop y guárdalo.
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <button className={btn} onClick={() => setStart(time)}>Marcar inicio</button>
          <button className={btn} onClick={() => setEnd(time)}>Marcar fin</button>
          <span className="font-mono text-xs text-body tabular-nums">
            {start.toFixed(2)} – {end.toFixed(2)} s
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <input
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="w-28 rounded-lg border border-line bg-surface px-2 py-1 text-xs text-ink"
            aria-label="Nombre del segmento"
          />
          <button className={btn} onClick={loopSegment} disabled={end <= start}>Probar en loop</button>
          <button className={btn} onClick={saveSegment} disabled={end <= start}>Guardar</button>
          {clip && (
            <button className={btn} onClick={() => play(clip)}>Volver al clip completo</button>
          )}
        </div>
        {segments.length > 0 && (
          <div className="flex flex-col gap-1">
            <ul className="font-mono text-xs text-body">
              {segments.map((s, i) => (
                <li key={i}>
                  {s.name}: {s.start.toFixed(2)} – {s.end.toFixed(2)} s
                </li>
              ))}
            </ul>
            <button className={`${btn} self-start`} onClick={copySegments}>
              {copied ? "Copiado ✓" : "Copiar lista"}
            </button>
          </div>
        )}
      </fieldset>
    </div>
  );
}
