import React, { useMemo, useContext } from "react";
import MaterialReactTable from "material-react-table";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { Chip, Stack, Box } from "@mui/material";
import { Typography } from "@mui/material";

const Example = () => {
  // AppDataContext
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  //should be memoized or stable
  const columns = data.cols.map((col) => {
    const newcol = {};
    newcol["header"] = col["headerName"];
    newcol["accessorKey"] = col["field"];
    return newcol;
  });

  const handleSaveCell = (cell, value) => {
    data.rows[cell.row.index][cell.column.id] = value;
    //send/receive api updates here
    dispatch({ type: "setRows", newrows: [...data.rows] }); //re-render with new data
    dispatch({
      type: "setSnackbar",
      snackbar: { children: "saved", severity: "success" },
    });
  };

  return (
    <Box
      sx={{
        "& .bad": {
          backgroundColor: "#ff3ee5",
          color: "#1a1a1a",
        },
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={data.rows}
        initialState={{ density: "compact" }}
        enableColumnResizing
        // Custom bottom toolbar
        renderBottomToolbarCustomActions={() => (
          <Typography sx={{ fontStyle: "italic", p: "0 1rem" }} variant="body2">
            Double-Click a Cell to Edit
          </Typography>
        )}
        // For editing
        editingMode="cell"
        enableEditing
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          //onBlur is more efficient, but could use onChange instead
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value);
          },
        })}
      />
    </Box>
  );
};

export default Example;
