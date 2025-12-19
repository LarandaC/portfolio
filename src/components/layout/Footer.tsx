import { Box, IconButton, Typography } from "@mui/material";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: { xs: 2, sm: 4, md: 7 },
        backgroundColor: "background.paper",
        position: "relative",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: 12,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        &copy; {new Date().getFullYear()} Leticia. Todos los derechos
        reservados.
      </Typography>

      <IconButton
        component="a"
        href="#hero"
        onClick={scrollToTop}
        sx={{
          backgroundColor: (theme) =>
            `alpha(${theme.palette.primary.main}, 0.1)`,
          color: "primary.main",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: (theme) =>
              `alpha(${theme.palette.primary.main}, 0.2)`,
            transform: "translateY(-3px)",
          },
        }}
        aria-label="Volver arriba"
      >
        <ArrowUp size={22} />
      </IconButton>
    </Box>
  );
};
