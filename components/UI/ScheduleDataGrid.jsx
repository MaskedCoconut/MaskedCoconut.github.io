import { Box, Button, Chip, Input, Collapse, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Papa from "papaparse";
import React, { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import * as Constants from "../settings";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ReplayIcon from "@mui/icons-material/Replay";
import { getRowError } from "../utils";
import { AirportIcons } from "../icons/icons";
import ScheduleColsMatcher from "./ScheduleColsMatcher";

export default function DataGridDemo() {
  // AppDataContext
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  // File upload and refresh functions
  // File input change
  const handleFileChange = (event) => {
    if (event.target.files.length) {
      const inputFile = event.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!Constants.ALLOWEDEXTENSIONS.includes(fileExtension)) {
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "Only .csv are accepted", severity: "error" },
        });
      } else {
        dispatch({ type: "setFile", file: inputFile });
        dispatch({
          type: "setSnackbar",
          snackbar: { children: ".csv file found", severity: "success" },
        });
        data["file"] = inputFile;
        handleLoad();
      }
    }
  };

  // Parse and update data
  const handleLoad = () => {
    if (!data.file) {
      dispatch({
        type: "setSnackbar",
        snackbar: { children: "select a csv file first", severity: "error" },
      });
    } else {
      const reader = new FileReader();
      reader.readAsText(data.file);
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: "greedy",
        });
        const parsedData = csv?.data;
        const rows = parsedData.map((row, idx) =>
          Object.assign({ id: idx }, row)
        );

        dispatch({ type: "setRows", newrows: rows, option: "reinit" });
        dispatch({ type: "setMatch", match: "reinit" });
        dispatch({ type: "setIsValidated", isvalidated: false });
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "data loaded from file", severity: "success" },
        });
      };
    }
  };

  // deleteable Chip with filename
  const handleDeleteChip = () => {
    dispatch({ type: "setFile", file: null });
  };

  const cols = data.rows
    ? Object.keys(data.rows[0]).map((col) =>
        Object.fromEntries([
          ["field", col],
          ["headerName", col],
          ["editable", true],
          ["flex", 1],
          ["minWidth", 100],
        ])
      )
    : [];

  const MyCustomNoRowsOverlay = () => (
    <Box
      height="100%"
      alignContent="center"
      alignItems="stretch"
      justifyContent="center"
      justifyItems="center"
      sx={{ display: "flex" }}
    >
      <Button component="label" sx={{ flexGrow: 1 }}>
        <input
          onChange={handleFileChange}
          id="csvInput"
          hidden
          accept=".csv"
          type="File"
        />
        <Typography variant="h2" sx={{ fontSize: 90 }} color="primary">
          <AirportIcons
            type="FlightscheduleIcon"
            sx={{ fontSize: 90, mr: 3 }}
          />
          Import a Schedule
        </Typography>
      </Button>
    </Box>
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

  const [isMatchvisible, SetisMatchvisible] = React.useState(false);
  const toggleMatchvisible = () => SetisMatchvisible(!isMatchvisible);

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
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarDensitySelector />
        <GridToolbarExport />

        {!data.file ? (
          <Button
            color="primary"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            Select .csv
            <input
              onChange={handleFileChange}
              id="csvInput"
              hidden
              accept=".csv"
              type="File"
            />
          </Button>
        ) : (
          [
            <Chip label={`${data.file.name}`} onDelete={handleDeleteChip} />,

            <Button
              color="primary"
              startIcon={<ReplayIcon />}
              onClick={handleLoad}
            >
              reload .csv
            </Button>,
            <Button
              color="primary"
              startIcon={<AirportIcons type="FlightscheduleIcon" />}
              onClick={toggleMatchvisible}
            >
              Match columns
            </Button>,
          ]
        )}
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
        height: isfullScreen ? "100vh" : "70vh",
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
      <Collapse in={isMatchvisible}>
        <ScheduleColsMatcher
          isMatchvisible={isMatchvisible}
          SetisMatchvisible={SetisMatchvisible}
        />
      </Collapse>

      <DataGrid
        columns={cols}
        rows={data.rows ? data.rows : []}
        density="compact"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
        autoPageSize
        pagination={isfullScreen ? 50 : 10}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: CustomToolbar, noRowsOverlay: MyCustomNoRowsOverlay }}
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
