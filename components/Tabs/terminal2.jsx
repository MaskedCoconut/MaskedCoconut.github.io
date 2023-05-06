import * as React from "react";
import { useContext } from "react";
import TerminalSimpleEditor from "../UI/terminalSimpleEditor";
import Testgraph from "../UI/testgraph";
import { AppDataContext } from "../context/AppDataContext";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import ProcessorCard from "../UI/ProcessorCard";
import AddNewCard from "../UI/AddNewCard";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyItems="center"
        alignItems="center"
        margin="auto"
      >
        {Object.keys(data.terminal).map((processor) => (
          <Grid item xs={4}>
            <ProcessorCard processor={data.terminal[processor]} />
          </Grid>
        ))}
        <Grid item xs={4}>
          <AddNewCard />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
