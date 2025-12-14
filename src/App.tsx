import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Suspense, lazy } from "react";
import { Loader } from "./components/ui/Loader";

const Index = lazy(() => import("./pages/Index").then(module => ({ default: module.Index })));
const NotFound = lazy(() => import("./pages/NotFound").then(module => ({ default: module.NotFound })));

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
