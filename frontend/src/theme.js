import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#329bca",
      100: "#0678cf", // Lightest shade of blue
      200: "#0e68ad",
      300: "#0761a6",
      400: "#08638a",
      500: "#011F5E", // Default shade of blue
      600: "#154c63",
      700: "#0C1B2B",
      800: "#061321",
      900: "#030d17",
    },
    secondary: {
      main: "#204a81",
      300: "#5c7cad",
      400: "#4b6a99",
      500: "#27518a", // Default shade of gray
      600: "#204a81",
      700: "#164176",
      800: "#0f376a",
      900: "#072752", // Darkest shade of gray (almost black)
    },
    accent: {
      main: "#FF8F00",
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
    background: {
      default: "#000F20",
      alt: "#227caa",
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  },
});
