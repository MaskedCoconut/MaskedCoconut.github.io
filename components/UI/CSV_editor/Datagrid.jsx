import { Box, Button, Chip, ToggleButton, Typography } from "@mui/material";
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
} from "../../context/CSV_editor/AppDataContext";
import * as Constants from "../../settings";

import { DeleteForever } from "@mui/icons-material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ReplayIcon from "@mui/icons-material/Replay";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { AirportIcons } from "../../icons/icons";
import { getRowError } from "../../utils";

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

        dispatch({ type: "setRows", newrows: rows });
        // dispatch({ type: "setMatch", match: "reinit" });
        // dispatch({ type: "setIsValidated", isvalidated: false });
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "data loaded from file", severity: "success" },
        });
        SetisMatchvisible(true);
        setColumnVisibilityModel({});
      };
    }
  };

  // delete the data
  const handleDeletedata = () => {
    dispatch({ type: "setRows", newrows: null });
    dispatch({ type: "setFile", file: null });
    dispatch({ type: "setSimresult", newsimresult: null });
    SetisMatchvisible(false);
  };

  const columsSorted = data.rows
    ? [...Object.keys(data.rows[0]).filter((col) => col != "id")].sort(
        (a, b) => {
          if (a === "error") {
            return -1;
          }
        }
      )
    : [];

  const cols = data.rows
    ? [
        Object.fromEntries([
          ["field", "id"],
          ["headerName", "id"],
          ["editable", false],
          ["width", 75],
        ]),
      ].concat(
        columsSorted.map((col) =>
          Object.fromEntries([
            ["field", col],
            ["headerName", col],
            ["editable", true],
            ["flex", 1],
            ["minWidth", 100],
          ])
        )
      )
    : [];

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

  function MyCustomNoRowsOverlay() {
    return (
      <Box
        height="100%"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
        sx={{ display: "flex" }}
      >
        <Button
          color="primary"
          component="label"
          startIcon={<UploadFileIcon style={{ fontSize: "100px" }} />}
          style={{ fontSize: "50px", padding: "10px", color: "primary" }}
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
      </Box>
    );
  }

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
          <Chip
            label={`${data.file.name}`}
            //  onDelete={handleDeleteChip}
          />
        )}
        {data.rows && (
          <Box>
            <Button
              color="primary"
              startIcon={<DeleteForever />}
              onClick={handleDeletedata}
            >
              Delete all
            </Button>
            {data.file && (
              <Button
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={handleLoad}
              >
                reload .csv
              </Button>
            )}
            <ToggleButton
              color="primary"
              onClick={toggleMatchvisible}
              selected={isMatchvisible}
              variant="text"
              size="small"
              sx={{ border: 0 }}
            >
              <Typography color="primary">
                <AirportIcons type="FlightscheduleIcon" sx={{ mr: 1 }} />
                column menu
              </Typography>
            </ToggleButton>
          </Box>
        )}
      </GridToolbarContainer>
    );
  }

  const setColumnVisibilityModel = (newModel) => {
    dispatch({ type: "setColumnsVis", newcolumnsvis: newModel });
  };

  return (
    <Box
      sx={{
        "& .bad": {
          backgroundColor: "#bd93f9",
          color: "#282a36",
        },
        width: isfullScreen ? "100vw" : "95%",
        position: isfullScreen && "absolute",
        height: isfullScreen ? "100vh" : "80vh",
        minHeight: 600,
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
        columns={cols}
        rows={data.rows ? data.rows : []}
        columnVisibilityModel={data.columnsvis}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
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
      />
    </Box>
  );
}
