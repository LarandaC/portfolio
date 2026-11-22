/** `dark` class on <html>; index.html sets it before first paint. */
export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)");

export function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Blocked storage: won't persist.
  }
  applyTheme(theme);
}

/** Notifies on any theme change; also follows the system while no choice is stored. */
export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  const media = systemDark();
  const onSystemChange = (e: MediaQueryListEvent) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Ignore: treat as "no stored choice".
    }
    if (!stored) applyTheme(e.matches ? "dark" : "light");
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}
