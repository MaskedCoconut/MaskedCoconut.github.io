import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppProvider from "../../context/CSV_editor/AppDataContext";
import Footer from "../footer";
import Head from "../head";
import AppBar from "./appbar";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        spacing: { xs: 1, sm: 2, md: 4 },
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: { xs: 1, sm: 2, md: 4 },
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
        alignItems: "center",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#ffff",
          },
        },
        textColorPrimary: { color: "#ccd1d6" },
      },
    },
  },
  palette: {
    // primary: { main: "#21235b" },
    // secondary: { main: "#e90e8b" },
    LoS: {
      Optimal: "#10b981",
      "Sub-Optimal": "#f97316",
      "Over-Design": "#0679d0",
      "Under-Provided": "#f43f5e",
    },
    couldusethis: "#eab308",
    anothercoolcolor: "",
    coolcolor: "#06b6d4",
    background: {
      paper: "rgba(252,252,252,0.9)",
    },
  },
});

export default function Layout({ children }) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Head />
        <AppBar />
        <Box
          sx={{
            pt: 1,
            pr: 1,
            pl: 1,
            pb: 1,
            minHeight: "87vh",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {children}
        </Box>
        <Footer />
      </ThemeProvider>
    </AppProvider>
  );
}
