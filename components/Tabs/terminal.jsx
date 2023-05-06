import * as React from "react";
import { useContext } from "react";
import TerminalSimpleEditor from "../UI/terminalSimpleEditor";
import Testgraph from "../UI/testgraph";
import { AppDataContext } from "../context/AppDataContext";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Grid
        container
        spacing={2}
        disableEqualOverflow
        justifyItems="center"
        alignItems="center"
        margin="auto"
      >
        <Grid padding={1} xs={12}>
          {data.simresult && <Testgraph />}
        </Grid>
        <Grid padding={1} margin="auto">
          <TerminalSimpleEditor />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
