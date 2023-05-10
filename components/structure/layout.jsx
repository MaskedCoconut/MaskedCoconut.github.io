import * as React from "react";
import AppBar from "./appbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./footer";
import AppProvider from "../context/AppDataContext";
import Box from "@mui/material/Box";
import Head from "./head";

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
