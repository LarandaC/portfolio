import { Box, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Luna
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sol
import { useColorMode } from "./themeContext";

export const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      onClick={toggleColorMode}
      sx={{
        width: 50,
        height: 26,
        borderRadius: 20,
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        padding: "2px",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      {/* El círculo (Thumb) */}
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: isDark ? "primary.main" : "#6366f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isDark ? "translateX(24px)" : "translateX(0px)",
          boxShadow: (theme) => theme.shadows[2],
        }}
      >
        {isDark ? (
          <Brightness7Icon sx={{ fontSize: "14px", color: "#fff" }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: "14px", color: "#fff" }} />
        )}
      </Box>
    </Box>
  );
};
