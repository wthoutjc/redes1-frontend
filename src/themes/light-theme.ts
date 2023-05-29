import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#177ca8",
      light: "#d6efed",
      contrastText: "#f8efed",
      dark: "#144e84",
    },
    secondary: {
      main: "#85c3dd",
      dark: "#7055a6",
      light: "#bdbcdb",
      contrastText: "#f8efed",
    },
    background: {
      default: "#f5f6fa",
      paper: "#d6efed",
    },
    text: {
      primary: "#144e84",
      secondary: "#177ca8",
      disabled: "#2c3e50",
    },
  },
});

export { lightTheme };
