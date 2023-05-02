import * as React from "react";
import AppBar from "./UI/appbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./UI/footer";
import AppProvider from "../components/context/AppDataContext";
import Box from "@mui/material/Box";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        spacing: { xs: 1, sm: 2, md: 4 },
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
    },
  },
  palette: {
    primary: { main: "#21235b" },
    secondary: { main: "#e90e8b" },
  },
});

export default function Layout({ children }) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppBar />
        <Box minHeight={500}>{children}</Box>
        <Footer />
      </ThemeProvider>
    </AppProvider>
  );
}
