import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { Stack } from "@mui/material";

import Button from "@mui/material/Button";

// Get keys (array) by value
const getKeyByValue = (object, value) => {
  return Object.keys(object).filter((key) => object[key] === value);
};

// Returns filtered object keeping only keys matching value
// Assign "" to all values if isReinit = true
const FilterObjectOnValue = (obj, val, isReinit) => {
  const asArray = Object.entries(obj);
  const filteredArray = asArray.filter(([key, value]) => value === val);
  const filteredObject = Object.fromEntries(filteredArray);
  const result = Object.fromEntries(
    Object.keys(filteredObject).map((key) => [key, isReinit ? "" : obj.key])
  );
  return result;
};

export default function BasicSelect({
  selectList,
  colDataGrid,
  setColDataGrid,
  match,
  setMatch,
}) {
  const choices = colDataGrid.map((col) => col.field);

  const handleClearClick = (col) => {
    const deletedValue = Object.fromEntries([[col, ""]]);
    // Update the match Object
    setMatch((match) => ({
      ...match,
      ...deletedValue,
    }));
  };

  const handleChange = (e) => {
    // record the updated value
    const updatedValue = Object.fromEntries([[e.target.name, e.target.value]]);
    // take out the value if it is already somewhere
    const reinitValues = FilterObjectOnValue(match, e.target.value, true);
    // Update the match Object
    setMatch((match) => ({
      ...match,
      ...updatedValue,
      ...reinitValues,
    }));
  };

  const handleMatchClick = () => {
    console.log(match);

    // look at each colDataGrid, if headerName is matched (= in the values of match), change the headerName to the corresponding key in match

    const matchedHeaderName = Object.values(match);
    console.log(matchedHeaderName);

    const updatedColDatagrid = colDataGrid.map((col) =>
      matchedHeaderName.includes(col["headerName"]) && col["headerName"] != ""
        ? Object.fromEntries([
            ["field", col["field"]],
            ["headerName", ...getKeyByValue(match, col["headerName"])],
            ["width", 150],
            ["editable", true],
          ])
        : col
    );

    console.log(updatedColDatagrid);

    setColDataGrid(updatedColDatagrid);

    console.log(colDataGrid);

    // activate the data validation
  };

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
    >
      {selectList.map((col) => (
        <Box key={"box" + col} sx={{ minWidth: 120 }}>
          <FormControl key={"form" + col} fullWidth>
            <InputLabel
              key={"InputLabel" + col}
              id={"demo-simple-select-label" + col}
            >
              {col}
            </InputLabel>
            <Select
              key={"select" + col}
              labelId={"demo-simple-select-label" + col}
              id={"demo-simple-select" + col}
              value={match[col]}
              label={col}
              name={col}
              onChange={handleChange}
              sx={{
                "& .MuiSelect-iconOutlined": {
                  // display: match[col] ? "none" : "",
                  display: "none",
                },
                "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
              }}
              // endAdornment={
              //   <IconButton
              //     sx={{ visibility: match[col] ? "visible" : "hidden" }}
              //     onClick={() => handleClearClick(col)}
              //   >
              //     <ClearIcon />
              //   </IconButton>
              // }
            >
              {choices.map((val) => (
                <MenuItem key={val} value={val}>
                  {" "}
                  {val}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}

      <Button variant="contained" component="label" onClick={handleMatchClick}>
        update columns
      </Button>
    </Stack>
  );
}
