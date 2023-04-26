import { Alert, Chip, Snackbar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Papa from "papaparse";
import { useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/AppDataContext";

import * as Constants from "../components/settings";

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
  // File input change
  const handleFileChange = (event) => {
    // Check if user has entered the file
    if (event.target.files.length) {
      const inputFile = event.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      debugger;
      if (!Constants.ALLOWEDEXTENSIONS.includes(fileExtension)) {
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "Only .csv are accepted", severity: "error" },
        });
        return;
      }

      // If input type is correct set the state
      dispatch({ type: "setFile", file: inputFile });
      dispatch({
        type: "setSnackbar",
        snackbar: { children: ".csv file found", severity: "success" },
      });
      return;
    }
  };

  // Parse and update data
  const handleLoad = () => {
    if (!data.file)
      return dispatch({
        type: "setSnackbar",
        snackbar: { children: "select a csv file first", severity: "error" },
      });

    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      dispatch({ type: "ParsedCsvData", parsedData: parsedData });
    };
    reader.readAsText(data.file);
    dispatch({ type: "setMatch", match: "reinit" });
    dispatch({
      type: "setSnackbar",
      snackbar: { children: "data loaded from file", severity: "success" },
    });
  };

  return (
    <div>
      <Stack direction="row" flexWrap="wrap">
        <div>
          <Stack direction="row" spacing={0.1}>
            <Button variant="contained" component="label">
              Select .csv
              <input
                onChange={handleFileChange}
                id="csvInput"
                hidden
                type="File"
              />
            </Button>
            {data.file && (
              <Chip size="small" label={data.file && `${data.file.name}`} />
            )}
          </Stack>
        </div>
        <Button variant="contained" component="label" onClick={handleLoad}>
          Load .csv
        </Button>
        {data.isvalidated && (
          <Link href="/showup">
            <Button variant="contained" component="label">
              To showup
            </Button>
          </Link>
        )}
      </Stack>
      <div>
        <Stack width={"90%"}>
          {data.cols && <SelectColumn />}
          {data.cols && <DataGridDemo />}
          {!!data.snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
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
