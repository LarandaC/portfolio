import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { useEffect, useState } from "react";
import { Loader } from "./components/ui/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
