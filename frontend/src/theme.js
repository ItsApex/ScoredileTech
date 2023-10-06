import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#329bca",
      100: "#b9dfea", // Lightest shade of blue
      200: "#92cadd",
      300: "#6cb6d1",
      400: "#4da9ce",
      500: "#329bca", // Default shade of blue
      600: "#2c8ebd",
      700: "#227caa",
      800: "#1b6c98",
      900: "#034d79",
    },
    secondary: {
      main: "#204a81",
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
      default: "#070f1a",
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
