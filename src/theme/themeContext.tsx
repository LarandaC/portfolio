import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { darkTheme as customDark, lightTheme as customLight } from "./theme"; // Tus archivos de tema

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Intentar leer la preferencia del localStorage o usar dark por defecto
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved as "light" | "dark") || "dark";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  // Fusionamos tu tema personalizado con el modo activo
  const theme = useMemo(() => {
    const baseTheme = mode === "dark" ? customDark : customLight;
    return createTheme(baseTheme, {
      palette: {
        mode,
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
