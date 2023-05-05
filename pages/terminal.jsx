import * as React from "react";
import { useContext } from "react";
import TerminalSimpleEditor from "../components/UI/terminalSimpleEditor";
import Testgraph from "../components/UI/testgraph";
import { AppDataContext } from "../components/context/AppDataContext";
import { Stack, Grid } from "@mui/material";

const App = () => {
  const data = useContext(AppDataContext);
  return (
    <>
      <Grid
        container
        spacing={2}
        disableEqualOverflow
        justifyItems="center"
        alignItems="center"
      >
        <Grid padding={1} xs={12}>
          {data.simresult && <Testgraph />}
        </Grid>
        <Grid padding={1}>
          <TerminalSimpleEditor />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
