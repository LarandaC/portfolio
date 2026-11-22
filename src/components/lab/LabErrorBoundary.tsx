import { Component, type ReactNode } from "react";

type LabErrorBoundaryProps = { children: ReactNode };
type LabErrorBoundaryState = { error: Error | null };

/**
 * Keeps one broken model from taking the whole lab down, and says how to fix the usual cause.
 * Remount it with a `key` per model so choosing another one clears the error.
 */
export class LabErrorBoundary extends Component<LabErrorBoundaryProps, LabErrorBoundaryState> {
  state: LabErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): LabErrorBoundaryState {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex size-full flex-col items-center justify-center gap-3 bg-mist p-8 text-center">
        <p className="text-base font-semibold text-ink">No se pudo cargar este modelo</p>
        <p className="max-w-md text-sm text-body">
          Si el archivo es nuevo: corre <code className="rounded bg-surface px-1">npm run models</code> y reinicia el
          servidor de desarrollo. Vite no detecta archivos agregados a <code className="rounded bg-surface px-1">public/</code> mientras
          está corriendo.
        </p>
        <p className="max-w-md font-mono text-xs break-all text-muted-ink">{this.state.error.message}</p>
      </div>
    );
  }
}
