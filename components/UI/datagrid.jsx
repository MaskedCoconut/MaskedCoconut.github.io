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
import { AppDataContext } from "../context/AppDataContext";

export default function DataGridDemo() {
  // AppDataContext
  const data = useContext(AppDataContext);

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
          backgroundColor: "#ff3ee5",
          color: "#1a1a1a",
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
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
        slots={{ toolbar: CustomToolbar }}
        // for the conditional formatting of cells
        getCellClassName={(params) => {
          switch (params.colDef.field) {
            case "Flight Number":
              const regex = new RegExp("s");
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
