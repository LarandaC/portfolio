import { Button as MuiButton, Box, alpha } from "@mui/material";

interface SecondaryButtonProps {
  text: string;
  href: string;
}

export const SecondaryButton = ({ text, href }: SecondaryButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        pt: { xs: 0, sm: 4 },
        justifyContent: "center",
      }}
    >
      <MuiButton
        component="a"
        href={href}
        variant="outlined"
        size="large"
        target={href.endsWith(".pdf") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        sx={{
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",

          borderColor: "primary.main",
          color: "primary.main",

          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          "&:hover": {
            borderWidth: "1px",
            borderColor: "primary.light",
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            transform: "translateY(-2px)",
            boxShadow: (theme) =>
              `0 0 15px ${alpha(theme.palette.primary.main, 0.4)}`,
          },

          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        {text}
      </MuiButton>
    </Box>
  );
};
