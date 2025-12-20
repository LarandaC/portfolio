import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Suspense } from "react";
import { Loader } from "./components/ui/Loader";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { ColorModeProvider } from "./theme/themeContext";

function App() {
  return (
    <ColorModeProvider>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ColorModeProvider>
  );
}

export default App;
