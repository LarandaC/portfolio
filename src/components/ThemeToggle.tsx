import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

// ThemeToggle componente para cambiar de tema oscuro a light
export const ThemeToggle = () => {
  // Verifica el tema actual y establece el estado inicial
  const [isDarkMode, setIsDarkMode] = useState(false);

  // verifica el tema almacenado en localStorage al cargar el componente
  // y aplica el tema correspondiente al documento HTML
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme == "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  // Setea el tema basado en la preferencia del usuario, y se guarda en localStorage
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Retornar el botón de cambio de tema con iconos
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed bottom-5 max-sm:hidden right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outline-hidden"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
