import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

export default function DataGridDemo() {
  // AppDataContext
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const updatedRows = data.rows.map((row) =>
      row.id === newRow.id ? updatedRow : row
    );
    dispatch({ type: "setRows", newrows: updatedRows });
    dispatch({
      type: "setSnackbar",
      snackbar: { children: "saved", severity: "success" },
    });
    return updatedRow;
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        "& .bad": {
          backgroundColor: "#bd93f9",
          color: "#282a36",
        },
      }}
    >
      <DataGrid
        rows={data.rows}
        density="compact"
        columns={data.cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: CustomToolbar }}
        // for editing
        processRowUpdate={processRowUpdate}
        // for the conditional formatting of cells
        getCellClassName={(params) => {
          switch (params.colDef.field) {
            case "Flight Number":
              let regex = /[A-Za-z0-9]+\s[0-9]+/i;
              return regex.test(params.value) ? "ok" : "bad";
            case "Flight Date":
              return Date.parse(params.value) ? "ok" : "bad";
            case "Scheduled Time":
              const originTime = "2022-10-13 ";
              return Date.parse([originTime, params.value].join(""))
                ? "ok"
                : "bad";
            case "Arr./Dep.":
              return ["A", "D"].includes(params.value) ? "ok" : "bad";
            case "Int./Dom.":
              return ["I", "D"].includes(params.value) ? "ok" : "bad";
            case "T1/T2":
              return ["T1", "T2"].includes(params.value) ? "ok" : "bad";
            case "Intl Regions":
              return "ok";
            case "Category(P/C/O)":
              return ["P", "C", "O"].includes(params.value) ? "ok" : "bad";
            case "Seats":
              return !isNaN(params.value) ? "ok" : "bad";
            case "Pax":
              return !isNaN(params.value) ? "ok" : "bad";
            default:
              return "ok";
          }
        }}
      />
    </Box>
  );
}
