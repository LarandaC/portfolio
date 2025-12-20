import {
  alpha,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { navItems } from "@/lib/navigation";

interface NavBarMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const NavBarMobile = ({
  isMenuOpen,
  setIsMenuOpen,
}: NavBarMobileProps) => {
  return (
    <Drawer
      anchor="right"
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "280px", sm: "350px" },
            height: "100%",
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.98),
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            p: 3,
            borderLeft: "1px solid",
            borderColor: "divider",
            backgroundImage: "none",
          },
        },
      }}
    >
      {/* Botón Cerrar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton
          onClick={() => setIsMenuOpen(false)}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Lista de Navegación */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText
                primary={item.name}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      color: "text.primary",
                      transition: "color 0.2s",
                      "&:hover": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
