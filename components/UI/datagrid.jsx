import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

export default function DataGridDemo() {
  // AppDataContext
  const data = useContext(AppDataContext);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton /> */}
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  if (typeof data.rows != "undefined" && typeof data.cols != "undefined") {
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box
          sx={{
            height: 500,
            width: "100%",
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
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            // for the conditional formatting of cells
            getCellClassName={(params) => {
              switch (params.colDef.headerName) {
                case "Flight Date":
                  return Date.parse(params.value) ? "ok" : "bad";
                case "Arr./Dep.":
                  return ["A", "D"].includes(params.value) ? "ok" : "bad";
                default:
                  return "ok";
              }
            }}
          />
        </Box>
      </Stack>
    );
  }
}
