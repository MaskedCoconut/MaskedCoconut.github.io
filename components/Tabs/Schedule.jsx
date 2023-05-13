import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../UI/datagrid";
import SelectColumn from "../UI/select-column";
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
    <Stack minHeight={500}>
      {data.rows && <SelectColumn />}
      <DataGridDemo />
    </Stack>
  );
};

export default App;
