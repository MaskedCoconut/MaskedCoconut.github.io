import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import UploadStack from "../components/UI/uploadstack";
import MRTdata from "../components/UI/MRTdata";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/AppDataContext";

import { useState } from "react";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  // text change for the update columns button
  const [buttonText, setButtonText] = useState("Update columns");

  // shorthand
  const handleCloseSnackbar = () =>
    dispatch({
      type: "setSnackbar",
      snackbar: null,
    });

  return (
    <Stack minHeight={500}>
      <UploadStack setButtonText={setButtonText} />
      {data.rows && (
        <SelectColumn buttonText={buttonText} setButtonText={setButtonText} />
      )}
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
