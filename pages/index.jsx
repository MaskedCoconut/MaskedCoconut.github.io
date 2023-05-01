import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import UploadStack from "../components/UI/uploadstack";
import MRTdata from "../components/UI/MRTdata";
import {
  AppDataContext,
  AppDataDispatchContext,
  useState,
} from "../components/context/AppDataContext";

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
      {/* <Stack> */}
      {data.cols && <SelectColumn />}
      <Box width="95%">
        {data.cols && <DataGridDemo />}
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
      {/* </Stack> */}
    </Stack>
  );
};

export default App;
