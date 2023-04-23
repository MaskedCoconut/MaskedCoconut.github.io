import { Alert, Chip, Snackbar, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Papa from "papaparse";
import React, { useState } from "react";
import DataGridDemo from "../components/datagrid";
import Layout from "../components/layout";
import SelectColumn from "../components/select-column";
import MaterialReactTable from "../components/MRT";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

// List of destination columns to match
const selectList = [
  "Flight Number",
  "Flight Date",
  "Scheduled Time",
  "Arr./Dep.",
  "Int./Dom.",
  "T1/T2",
  "Intl Regions",
  "Category(P/C/O)",
  "SEATS",
  "PAX",
];

const App = () => {
  // It will store the file uploaded by the user
  const [file, setFile] = useState();

  // General snackbar
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  // Data
  // This state will store the parsed data
  const [parsedData, setParsedData] = useState();
  // columns as a list
  // const [colList, setColList] = useState();
  // This state will store the columns formatted for datagrid
  const [colDataGrid, setColDataGrid] = useState();
  // This state will store the rows formatted for datagrid
  const [rowsDataGrid, setRowsDataGrid] = useState();

  // Store the match between template (define above)
  // and the column chosen by user
  const [match, setMatch] = React.useState(
    Object.fromEntries(selectList.map((col) => [col, ""]))
  );

  // File input change
  const handleFileChange = (event) => {
    // Check if user has entered the file
    if (event.target.files.length) {
      const inputFile = event.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setSnackbar({ children: "Only .csv are accepted", severity: "error" });
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
      setSnackbar({ children: ".csv file found", severity: "success" });
    }
  };

  // Parse and update data
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file)
      return setSnackbar({
        children: "select a csv file first",
        severity: "error",
      });

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setParsedData(parsedData);

      const columns_datagrid = [
        { field: "id", headerName: "ID", width: 90 },
      ].concat(
        Object.keys(parsedData[0]).map((col) =>
          Object.fromEntries([
            ["field", col],
            ["headerName", col],
            ["width", 150],
            ["editable", true],
          ])
        )
      );

      const rows_datagrid = parsedData.map((row, idx) =>
        Object.assign({ id: idx }, row)
      );

      setColDataGrid(columns_datagrid);
      setRowsDataGrid(rows_datagrid);
    };
    reader.readAsText(file);
  };

  return (
    <Layout>
      <Stack direction="row" flexWrap="wrap">
        <Button variant="contained" component="label">
          Select .csv
          <input onChange={handleFileChange} id="csvInput" hidden type="File" />
        </Button>
        <Button variant="contained" component="label" onClick={handleParse}>
          Load .csv
        </Button>
        {file && <Chip label={file && `${file.name} - ${file.type}`} />}
      </Stack>

      <Stack width={"90%"}>
        {colDataGrid && (
          <SelectColumn
            selectList={selectList}
            colDataGrid={colDataGrid}
            setColDataGrid={setColDataGrid}
            match={match}
            setMatch={setMatch}
          />
        )}
        <DataGridDemo columns={colDataGrid} rows={rowsDataGrid} />
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
    </Layout>
  );
};

export default App;
