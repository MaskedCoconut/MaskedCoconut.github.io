import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { useContext } from "react";
import ScheduleDatagrid from "../UI/ScheduleDataGrid";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

import { useState } from "react";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  return (
    <Stack minHeight={600}>
      <ScheduleDatagrid />
    </Stack>
  );
};

export default App;
