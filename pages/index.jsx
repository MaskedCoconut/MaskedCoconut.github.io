import { Alert, Snackbar, Stack } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import UploadStack from "../components/UI/uploadstack";
import {
  AppDataContext,
  AppDataDispatchContext,
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
    <div>
      <UploadStack />
      <div>
        <Stack width={"90%"}>
          {data.cols && <SelectColumn />}
          {data.cols && <DataGridDemo />}
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
      </div>
    </div>
  );
};

export default App;
