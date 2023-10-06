import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      100: "#E3F2FD", // Lightest shade of blue
      200: "#BBDEFB",
      300: "#90CAF9",
      400: "#64B5F6",
      500: "#42A5F5", // Default shade of blue
      600: "#2196F3",
      700: "#1E88E5",
      800: "#1976D2",
      900: "#1565C0",
      1000: "#0D47A1", // Darkest shade of blue
    },
    secondary: {
      main: "#616161",
      100: "#E0E0E0", // Lightest shade of gray
      200: "#BDBDBD",
      300: "#9E9E9E",
      400: "#757575",
      500: "#616161", // Default shade of gray
      600: "#424242",
      700: "#212121",
      800: "#000000",
      900: "#000000", // Darkest shade of gray (almost black)
    },
    accent: {
      100: "#FFD54F", // Lightest shade of accent color
      200: "#FFC107",
      300: "#FFA000",
      400: "#FF8F00",
      500: "#FF6F00", // Default shade of accent color
      600: "#FF5722",
      700: "#F4511E",
      800: "#E64A19",
      900: "#D84315",
      1000: "#BF360C", // Darkest shade of accent color
    },
  },
});
