import * as React from "react";
import { useContext } from "react";
import FacilityGraph from "../UI/FacilityGraph";
import { AppDataContext } from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { optionsProcessorGraph } from "../settings";
import cloneDeep from "lodash.clonedeep";

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
        {data.simresult &&
          Object.keys(data.terminal)
            .filter((key) => data.simresult[key])
            .map((key) => {
              const options = cloneDeep(optionsProcessorGraph);
              return (
                <Grid key={key} padding={1} xs={12}>
                  <FacilityGraph key={key} processor={key} options={options} />
                </Grid>
              );
            })}
      </Grid>
    </>
  );
};

export default App;
