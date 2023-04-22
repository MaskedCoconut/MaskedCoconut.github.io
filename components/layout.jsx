import * as React from "react";
import AppBar from "./appbar";
import { Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        spacing: { xs: 1, sm: 2 },
        justifyContent: "center",
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
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <AppBar />
        {children}
      </Stack>
    </ThemeProvider>
  );
}
