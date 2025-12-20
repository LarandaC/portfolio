import { navItems } from "../../../lib/navigation";
import { useEffect, useState } from "react";
import {
  AppBar,
  useTheme as useMuiTheme,
  alpha,
  Container,
  Toolbar,
  Box,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { NavBarMobile } from "./NavBarMobile";
import Close from "@mui/icons-material/Close";
import Menu from "@mui/icons-material/Menu";
import { ThemeToggle } from "@/theme/ThemeToggle";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          if (isMenuOpen) setIsMenuOpen(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };
  const muiTheme = useMuiTheme();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 2 : 0}
        sx={{
          transition: "all 0.3s ease-in-out",
          py: isScrolled ? 0 : 1,
          backgroundColor: isScrolled
            ? alpha(muiTheme.palette.background.default, 0.8)
            : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          color: "text.primary",
          borderBottom: isScrolled ? "1px solid" : "none",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <MuiLink
              component="a"
              href="#hero"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "text.primary",
                "& span": { color: "primary.main", ml: 1 },
              }}
            >
              EleTech <span>Portafolio</span>
            </MuiLink>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
                alignItems: "center", // Asegura que el switch y los textos estén en la misma línea
              }}
            >
              {navItems.map((item) => (
                <MuiLink
                  component="a"
                  key={item.name}
                  href={item.href}
                  underline="none"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    opacity: 0.8,
                    transition: "0.3s",
                    "&:hover": {
                      opacity: 1,
                      color: "primary.main",
                    },
                  }}
                >
                  {item.name}
                </MuiLink>
              ))}

              {/* El Switch ahora estará alineado con los links */}
              <ThemeToggle />
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              onClick={handleMenuToggle}
              sx={{ display: { md: "none" }, color: "text.primary" }}
              aria-label="menu"
            >
              {isMenuOpen ? <Close /> : <Menu />}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Mobile Menu Drawer */}
      <NavBarMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
