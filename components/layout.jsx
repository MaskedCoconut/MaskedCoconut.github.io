import * as React from "react";
import AppBar from "./UI/appbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./UI/footer";
import AppProvider from "../components/context/AppDataContext";
import Box from "@mui/material/Box";
import Head from "next/head";

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
  },
  palette: {
    primary: { main: "#21235b" },
    secondary: { main: "#e90e8b" },
    background: {
      paper: "rgba(242,242,242,0.9)",
    },
  },
});

export default function Layout({ children }) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <AppBar />
        {/* <div className="min-h-[80vh] max-w-screen"> */}
        <Box sx={{ margin: 2 }}>{children}</Box>
        {/* </div> */}
        <Footer />
      </ThemeProvider>
    </AppProvider>
  );
}
