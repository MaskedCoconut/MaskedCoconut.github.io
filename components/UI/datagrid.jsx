import { Box, Button, Stack } from "@mui/material";
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

import { getRowError } from "../utils";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function DataGridDemo() {
  // AppDataContext
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const cols = Object.keys(data.rows[0]).map((col) =>
    Object.fromEntries([
      ["field", col],
      ["headerName", col],
      ["editable", true],
      ["flex", 1],
      ["minWidth", 100],
    ])
  );

  const processRowUpdate = (newRow) => {
    newRow["error"] = getRowError(newRow);
    const updatedRow = { ...newRow };
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

  const [isfullScreen, SetFullscreen] = React.useState(false);

  const toggleFullscreen = () => SetFullscreen(!isfullScreen);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={isfullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          onClick={toggleFullscreen}
        >
          fullscreen
        </Button>
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
        width: isfullScreen ? "100vw" : "95%",
        position: isfullScreen && "absolute",
        height: isfullScreen && "100vh",
        top: isfullScreen && 0,
        right: isfullScreen && 0,
        backgroundColor: "white",
        opacity: 1,
        zIndex: isfullScreen && 999,
      }}
      style={{
        ...(isfullScreen
          ? {
              height: "100vh",
              margin: 0,
              maxHeight: "100vh",
              maxWidth: "100vw",
              padding: 0,
              width: "100vw",
            }
          : {}),
      }}
    >
      <DataGrid
        rows={data.rows}
        density="compact"
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pagination={isfullScreen ? 50 : 10}
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
