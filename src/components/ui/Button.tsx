import { Button as MuiButton, Box, CircularProgress } from "@mui/material";

interface ButtonProps {
  text: string;
  href?: string;
  type?: "submit" | "button" | "reset";
  isSubmitting?: boolean;
}

export const Button = ({
  text,
  href,
  isSubmitting = false,
  type = "submit",
}: ButtonProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        pt: 4,
        justifyContent: "center",
      }}
    >
      <MuiButton
        component={href ? "a" : "button"}
        href={href}
        type={type}
        disabled={isSubmitting}
        variant="contained"
        // El loader interno opcional si está enviando
        startIcon={
          isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
        }
        sx={{
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          transition: "all 0.2s ease-in-out",

          "&:hover": {
            backgroundColor: "primary.main",
            transform: "scale(1.03)",
            boxShadow: (theme) =>
              `0 4px 14px 0 rgba(0,0,0,0.2) ${theme.palette.primary.main}66`,
          },

          "&:active": {
            transform: "scale(0.97)",
          },

          "&.Mui-disabled": {
            backgroundColor: "primary.main",
            opacity: 0.6,
            color: "primary.contrastText",
          },
        }}
      >
        {isSubmitting ? "Enviando..." : text}
      </MuiButton>
    </Box>
  );
};
