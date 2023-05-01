import React, { useMemo, useContext } from "react";
import MaterialReactTable from "material-react-table";
import { AppDataContext } from "../context/AppDataContext";
import { Chip, Stack, Box } from "@mui/material";

const Example = () => {
  // AppDataContext
  const data = useContext(AppDataContext);
  //should be memoized or stable
  const columns = data.cols.map((col) => {
    const newcol = {};
    newcol["header"] = col["headerName"];
    newcol["accessorKey"] = col["field"];
    return newcol;
  });

  return (
    <MaterialReactTable
      columns={columns}
      data={data.rows}
      initialState={{ density: "compact" }}
    />
  );
};

export default Example;
