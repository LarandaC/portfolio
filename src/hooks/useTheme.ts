import { useSyncExternalStore } from "react";
import { getTheme, setTheme, subscribeTheme } from "@/lib/theme";

/** Current theme plus a toggle; every component using it stays in sync. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light" as const);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, toggleTheme };
}
