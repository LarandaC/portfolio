import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../hooks/useTheme";

// ThemeToggle componente para cambiar de tema oscuro a light
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // Retornar el botón de cambio de tema con iconos
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed bottom-5 max-sm:hidden right-5 z-50 p-2 rounded-full transition-colors duration-300 cursor-pointer",
        "focus:outline-hidden"
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
