import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  alpha,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
          backgroundImage: "none",
          overflow: "hidden",
        },
      }}
      // Efecto de desenfoque del fondo (backdrop-blur-sm)
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.9),
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {/* Contenedor de Imagen y Botón Cerrar */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 250, md: 320 },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: "background.paper",
            color: "primary.main",
            "&:hover": { bgcolor: "background.paper", opacity: 0.9 },
          }}
          aria-label="Cerrar modal"
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="img"
          src={project.image}
          alt={project.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <DialogContent sx={{ p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
        >
          {project.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 4, lineHeight: 1.6 }}
        >
          {project.description}
        </Typography>

        {/* Tags */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {project.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              }}
            />
          ))}
        </Stack>

        {/* Links de Acción */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver Demo"
            sx={{
              color: "text.primary",
              transition: "0.3s",
              "&:hover": { color: "primary.main" },
            }}
          >
            <LaunchIcon sx={{ fontSize: 28 }} />
          </Link>

          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver Código en GitHub"
            sx={{
              color: "text.primary",
              transition: "0.3s",
              "&:hover": { color: "primary.main" },
            }}
          >
            <GitHubIcon sx={{ fontSize: 28 }} />
          </Link>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
