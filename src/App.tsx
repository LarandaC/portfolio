import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));
// Dev-only 3D model lab; `import.meta.env.DEV` is false in production builds, so it is dropped there.
const Lab = import.meta.env.DEV ? lazy(() => import("./pages/Lab").then((m) => ({ default: m.Lab }))) : null;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route index element={<Index />} />
          {Lab && <Route path="lab" element={<Lab />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
