import ClearIcon from "@mui/icons-material/Clear";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState, useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { ALLOWEDEXTENSIONS, SELECTLIST } from "../settings";
import { match } from "assert";

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

export default function BasicSelect({ setValidation }) {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);
  const choices = data.cols.map((col) => col["headerName"]);

  const handleSelect = (e) => {
    // record the updated value
    const updatedValue = Object.fromEntries([[e.target.name, e.target.value]]);
    // take out the value if it is already somewhere
    const reinitValues = FilterObjectOnValue(data.match, e.target.value, true);
    const newMatch = {
      ...data.match,
      ...updatedValue,
      ...reinitValues,
    };
    dispatch({ type: "setMatch", match: newMatch });
    console.log(data.match);
    debugger;
  };

  const handleMatchClick = () => {
    dispatch({ type: "UpdateCols", match: data.match });
    dispatch({ type: "setIsValidated", isvalidated: true });
    dispatch({ type: "setMatch", match: "reinit" });
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
      {SELECTLIST.map((col) => (
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
              value={data.match[col]}
              label={col}
              name={col}
              onChange={handleSelect}
              sx={{
                "& .MuiSelect-iconOutlined": {
                  // display: match[col] ? "none" : "",
                  display: "none",
                },
                "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
              }}
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
