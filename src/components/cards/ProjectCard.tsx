import { useState } from "react";
import { ProjectModal } from "../ui/ProjectModal";
import {
  alpha,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  projects: Project[];
}

export const ProjectCard = ({ projects }: ProjectCardProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };
  return (
    <>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            key={index}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: (theme) => theme.shadows[4],
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.divider, 0.7),
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02) translateY(-4px)",
                  boxShadow: (theme) => theme.shadows[10],
                  "& img": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              {/* Contenedor de Imagen */}
              <Box
                onClick={() => openModal(project)}
                sx={{
                  width: "100%",
                  height: 224,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.description}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </Box>

              {/* Contenido de la Card */}
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    textAlign: "left",
                  }}
                >
                  {project.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal / Dialog de MUI */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          open={!!selectedProject}
          onClose={closeModal}
        />
      )}
    </>
  );
};
