import { RevealOnScroll } from "../shared/RevealOnScroll";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Box, Container, Typography } from "@mui/material";

export const ProjectsSection = () => {
  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        position: "relative",
      }}
    >
      <RevealOnScroll>
        <Container maxWidth="lg">
          {/* Título de la Sección */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
            }}
          >
            Proyectos
          </Typography>

          {/* Descripción Subtítulo */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 8,
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Estos son algunos de mis proyectos recientes. Cada uno fue
            desarrollado con atención al detalle, rendimiento y experiencia de
            usuario.
          </Typography>

          {/* El Grid de Proyectos que migramos en el paso anterior */}
          <ProjectCard projects={projects} />
        </Container>
      </RevealOnScroll>
    </Box>
  );
};
