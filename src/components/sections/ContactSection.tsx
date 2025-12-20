import { Box, Container, Typography, Stack, alpha, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

export const ContactSection = () => {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 12,
        px: 2,
        position: "relative",
        backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        {/* Encabezado */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem" }, // text-3xl a 4xl
              fontWeight: 700,
              mb: 2,
              color: "text.primary",
            }}
          >
            ¿Listo para trabajar juntos?
          </Typography>

          {/* Línea de Degradado (w-20 h-1 rounded-full) */}
          <Box
            sx={{
              width: 80,
              height: 4,
              mx: "auto",
              borderRadius: "999px",
              background: (theme) =>
                `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: "672px", // max-w-2xl
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Estoy siempre abierta a discutir nuevos proyectos, ideas creativas u
          oportunidades para formar parte de tu visión.
        </Typography>

        {/* Botones de Contacto */}
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          justifyContent="center"
          useFlexGap
        >
          {/* GitHub Button */}
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1.5,
              bgcolor: "background.paper", // bg-card
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2, // rounded-lg
              color: "text.primary",
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                transform: "translateY(-2px)",
              },
            }}
          >
            <GitHubIcon sx={{ color: "primary.main" }} />
            <Typography variant="body1" fontWeight={500}>
              GitHub
            </Typography>
          </Link>

          {/* LinkedIn Button */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1.5,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              color: "text.primary",
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                transform: "translateY(-2px)",
              },
            }}
          >
            <LinkedInIcon sx={{ color: "primary.main" }} />
            <Typography variant="body1" fontWeight={500}>
              LinkedIn
            </Typography>
          </Link>

          {/* Mail Button (Primary Variant) */}
          <Link
            href="mailto:hello@example.com"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1.5,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 2,
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: (theme) => theme.shadows[2],
              "&:hover": {
                bgcolor: "primary.dark",
                transform: "translateY(-2px)",
                boxShadow: (theme) => theme.shadows[4],
              },
            }}
          >
            <MailOutlineRoundedIcon />
            <Typography variant="body1" fontWeight={600}>
              hello@example.com
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
