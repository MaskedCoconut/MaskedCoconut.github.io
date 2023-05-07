import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileChart from "../UI/ProfileChart";
import ShowUpChart from "../UI/ShowUpChart";
import ShowUpProfileSelector from "../UI/ShowUpProfileSelector";

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
        <Grid padding={1} justifyItems="center" alignItems="center">
          {data.profiledata && <ShowUpProfileSelector />}
        </Grid>
        <Grid xs padding={1} minWidth="70%">
          {data.profiledata && <ProfileChart />}
        </Grid>
        <Grid xs={12} padding={1}>
          {data.simresult && <ShowUpChart />}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
