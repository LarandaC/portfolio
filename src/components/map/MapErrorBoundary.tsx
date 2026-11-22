import { Component, type ReactNode } from "react";

type MapErrorBoundaryProps = {
  children: ReactNode;
  /** Called once when anything inside throws (a model that won't load, a shader error…). */
  onFail: () => void;
};

/** Catches errors from the 3D scene so the visitor is sent to the classic page instead of a broken map. */
export class MapErrorBoundary extends Component<MapErrorBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Map scene failed, falling back to the classic page:", error);
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
