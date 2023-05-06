import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../UI/datagrid";
import SelectColumn from "../UI/select-column";
import UploadStack from "../UI/uploadstack";
import MRTdata from "../UI/MRTdata";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

import { useState } from "react";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  // shorthand
  const handleCloseSnackbar = () =>
    dispatch({
      type: "setSnackbar",
      snackbar: null,
    });

  return (
    <Stack minHeight={500}>
      <UploadStack />
      {data.rows && <SelectColumn />}
      <Box width="95%">
        {data.rows && <DataGridDemo />}
        {/* {data.cols && <MRTdata />} */}
      </Box>
      {!!data.snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert {...data.snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Stack>
  );
};

export default App;
