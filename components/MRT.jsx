import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

const Example = (props) => {
  //should be memoized or stable
  const columns = props.columns.map((col) =>
    Object.fromEntries([
      ["accessorKey", col],
      ["header", col],
    ])
  );
  console.log(props.data);
  console.log(columns);
  return (
    <MaterialReactTable
      columns={columns}
      data={props.data}
      enableEditing
      enableStickyHeader
      //   enablePagination={false}
      muiTableContainerProps={{
        sx: { maxHeight: "400px" }, //give the table a max height
      }}
      muiTablePaginationProps={{
        rowsPerPageOptions: [20, 50, 100],
      }}
    />
  );
};

export default Example;
