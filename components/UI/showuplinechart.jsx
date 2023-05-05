import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileChart from "./ProfileChart";
import ShowUpChart from "./ShowUpChart";
import ShowUpProfileSelector from "./ShowUpProfileSelector";

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
      >
        <Grid padding={1} justifyItems="center" alignItems="center">
          <ShowUpProfileSelector />
        </Grid>
        <Grid xs padding={1} minWidth="70%">
          {data.profiledata && <ProfileChart />}
        </Grid>
        <Grid xs={12} padding={1}>
          <ShowUpChart />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
