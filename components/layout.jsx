import * as React from "react";
import AppBar from "./appbar";
import { Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./footer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AppProvider from "../components/simcontext";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        spacing: { xs: 1, sm: 2, md: 4 },
        justifyContent: "space-evenly",
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
        <Stack>
          <AppBar />
          <Stack divider={<Divider orientation="horizontal" flexItem />}>
            <Stack width="100%" minHeight={500}>
              {children}
            </Stack>
            <Footer />
          </Stack>
        </Stack>
      </ThemeProvider>
    </AppProvider>
  );
}
