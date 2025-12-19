import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "hsl(210, 40%, 98%)",
      paper: "hsl(0, 0%, 100%)", // --card
    },
    primary: {
      main: "hsl(250, 47%, 60%)", // --primary
      contrastText: "hsl(210, 40%, 98%)", // --primary-foreground
    },
    secondary: {
      main: "hsl(210, 40%, 98%)", // --secondary
    },
    text: {
      primary: "hsl(222, 47%, 11%)", // --foreground
    },
    divider: "hsl(214, 32%, 91%)", // --border
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "hsl(222, 47%, 4%)", // --background
      paper: "hsl(222, 47%, 8%)", // --card
    },
    primary: {
      main: "hsl(250, 65%, 65%)", // --primary
      contrastText: "hsl(213, 31%, 91%)", // --primary-foreground
    },
    secondary: {
      main: "hsl(214, 44%, 6%)", // --secondary
    },
    text: {
      primary: "hsl(213, 31%, 91%)", // --foreground
    },
    divider: "hsl(217, 33%, 20%)", // --border
  },
});
