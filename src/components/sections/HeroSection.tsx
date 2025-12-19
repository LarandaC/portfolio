import { Box, Container, Fade, IconButton, Typography } from "@mui/material";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import { Button } from "../ui/Button";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

export const HeroSection = () => {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        overflow: "hidden",
      }}
    >
      <RevealOnScroll>
        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 10 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Título Principal */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              <Fade in timeout={1000}>
                <span>Hola, soy </span>
              </Fade>
              <Fade in timeout={1500}>
                <Box component="span" sx={{ color: "primary.main" }}>
                  Leticia
                </Box>
              </Fade>
            </Typography>

            {/* Descripción */}
            <Fade in timeout={2000}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  color: "text.secondary",
                  maxWidth: "700px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Desarrolladora Frontend con pasión por crear soluciones
                innovadoras y mejorar la experiencia del usuario. Diseño
                aplicaciones web atractivas y funcionales, enfocadas en
                usabilidad y rendimiento.
              </Typography>
            </Fade>

            {/* Acción */}
            <Fade in timeout={2500}>
              <Box sx={{ mt: 2 }}>
                <Button text="Mis proyectos" href="#projects" />
              </Box>
            </Fade>
          </Box>
        </Container>
      </RevealOnScroll>

      {/* Indicador de Scroll hacia abajo */}
      <Box
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translate(-50%, 0)" },
            "50%": { transform: "translate(-50%, -10px)" },
          },
          animation: "bounce 2s infinite",
        }}
      >
        <IconButton
          component="a"
          href="#about"
          sx={{
            backgroundColor: (theme) =>
              `alpha(${theme.palette.primary.main}, 0.1)`,
            color: "primary.main",
            "&:hover": {
              backgroundColor: (theme) =>
                `alpha(${theme.palette.primary.main}, 0.2)`,
            },
            p: 1.5,
          }}
        >
          <ArrowDownwardRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
