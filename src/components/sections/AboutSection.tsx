import { RevealOnScroll } from "../shared/RevealOnScroll";
import { Button } from "../ui/Button";
import { SecondaryButton } from "../ui/SecondaryButton";
import { Box, Card, Container, Grid, Typography, alpha } from "@mui/material";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

export const AboutSection = () => {
  return (
    <Box
      component="section"
      id="about"
      sx={{ py: { xs: 8, md: 12 }, px: 2, relative: "true" }}
    >
      <RevealOnScroll>
        <Container maxWidth="lg">
          {/* Título de la sección */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              mb: 8,
            }}
          >
            Sobre{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Mi
            </Box>
          </Typography>

          <Grid container spacing={6} alignItems="center">
            {/* Columna Izquierda: Texto y Botones */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.75rem", fontWeight: 600 }}
                >
                  Passionate Web Developer
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", fontSize: "1.1rem" }}
                >
                  Soy desarrolladora especializada en crear aplicaciones web
                  responsivas, accesibles y de alto rendimiento utilizando
                  tecnologías modernas.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button href="#contact" text="Ponte en contacto" />
                  <SecondaryButton
                    href="/files/CV-LeticiaAranda-2025.pdf"
                    text="Descarga CV"
                  />
                </Box>
              </Box>
            </Grid>

            {/* Columna Derecha: Tarjetas de Servicios */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {[
                  {
                    icon: <CodeRoundedIcon />,
                    title: "Desarrollo web",
                    desc: "Aplicaciones web dinámicas y responsivas usando frameworks y librerías modernas.",
                  },
                  {
                    icon: <PersonRoundedIcon />,
                    title: "Diseño UI/UX",
                    desc: "Diseño interfaces intuitivas, enfocadas en la usabilidad y el atractivo visual.",
                  },
                  {
                    icon: <WorkRoundedIcon />,
                    title: "Copy y UI",
                    desc: "Combinando texto, diseño y funcionalidad para destacar el valor del producto.",
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 3,
                      display: "flex",
                      gap: 2,
                      border: "1px solid",
                      borderColor: (theme) => alpha(theme.palette.divider, 0.7),
                      backgroundColor: "background.paper",
                      borderRadius: 2,
                      /*
                      boxShadow: (theme) => theme.shadows[1],
                      */

                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

                      "&:hover": {
                        transform: "scale(1.02) translateY(-4px)",
                        boxShadow: (theme) => theme.shadows[10],
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "50%",
                        display: "flex",
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        height: "fit-content",
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 0.5, textAlign: "left" }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", textAlign: "left" }}
                      >
                        {service.desc}
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RevealOnScroll>
    </Box>
  );
};
