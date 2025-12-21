import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import ClickSpark from "./components/shared/ClickSpark";
import { Loader } from "@/components/ui/Loader";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <div className="relative min-h-screen w-full">
          <ClickSpark
            sparkSize={10}
            sparkRadius={20}
            sparkCount={8}
            duration={500}
            easing="ease-out"
          >
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route index element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ClickSpark>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
