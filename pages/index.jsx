import { Alert, Chip, Snackbar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Papa from "papaparse";
import React, { useState, useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/AppDataContext";

import { ALLOWEDEXTENSIONS, SELECTLIST } from "../components/settings";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  // It will store the file uploaded by the user
  const [file, setFile] = useState();

  // Page snackbar
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  // Store the status of column matching
  const [isValidated, setValidation] = React.useState(false);

  // File input change
  const handleFileChange = (event) => {
    // Check if user has entered the file
    if (event.target.files.length) {
      const inputFile = event.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!ALLOWEDEXTENSIONS.includes(fileExtension)) {
        setSnackbar({ children: "Only .csv are accepted", severity: "error" });
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
      setSnackbar({ children: ".csv file found", severity: "success" });
    }
  };

  // Parse and update data
  const handleLoad = () => {
    if (!file)
      return setSnackbar({
        children: "select a csv file first",
        severity: "error",
      });

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      dispatch({ type: "ParsedCsvData", parsedData: parsedData });
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <Stack direction="row" flexWrap="wrap">
        <Button variant="contained" component="label">
          Select .csv
          <input onChange={handleFileChange} id="csvInput" hidden type="File" />
        </Button>
        <Button variant="contained" component="label" onClick={handleLoad}>
          Load .csv
        </Button>
        {file && <Chip label={file && `${file.name} - ${file.type}`} />}
        {isValidated && (
          <Link href="/showup">
            <Button variant="contained" component="label">
              To showup
            </Button>
          </Link>
        )}
      </Stack>

      <Stack width={"90%"}>
        {data.cols && (
          <SelectColumn
            selectList={SELECTLIST}
            colDataGrid={data.cols}
            match={data.match}
            setMatch={(match) =>
              dispatch({ type: "UpdateMatch", match: match })
            }
            isValidated={isValidated}
            setValidation={setValidation}
          />
        )}
        {data.cols && <DataGridDemo />}
        {/* {columns && <MaterialReactTable columns={colList} data={data} />} */}
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Stack>
    </div>
  );
};

export default App;
