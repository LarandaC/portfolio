import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "p-2 rounded-full transition-colors duration-300",
        "hover:bg-border focus:outline-hidden cursor-pointer",
        className
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <MoonStar className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
