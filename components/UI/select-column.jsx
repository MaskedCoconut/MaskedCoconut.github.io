import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { SELECTLIST } from "../settings";

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
    // if match has only empty values, throw an error and do nothing
    if (Object.values(data.match).every((x) => x === null || x === "")) {
      dispatch({
        type: "setSnackbar",
        snackbar: {
          children: "no columns selected for match",
          severity: "error",
        },
      });
    } else {
      const matchedHeaderName = Object.values(data.match);
      const updatedColDatagrid = data.cols
        // filter to not recreate "error" column
        .filter((col) => col.field != "error")
        .map((col) =>
          matchedHeaderName.includes(col["headerName"]) &&
          col["headerName"] != ""
            ? Object.fromEntries([
                ["field", col["field"]],
                ["headerName", ...getKeyByValue(data.match, col["headerName"])],
                ["width", 150],
                ["editable", true],
              ])
            : col
        );
      const updatedColDatagridAndError = updatedColDatagrid.concat(
        Object.fromEntries([
          ["field", "error"],
          ["headerName", "error"],
          ["width", 150],
          ["editable", false],
          ["valueGetter", (params) => getRowError(params, data.match)],
        ])
      );

      dispatch({ type: "setCols", newcols: updatedColDatagridAndError });
      dispatch({ type: "setIsValidated", isvalidated: true });
      dispatch({ type: "setMatch", match: "reinit" });
    }
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

// Errors for conditional formatting
const getRowError = (params, match) => {
  let result = [1];
  // take only the matched columns
  Object.keys(match)
    .filter((key) => match[key])
    .forEach((headerName) => {
      switch (headerName) {
        case "Flight Date":
          result.push(Date.parse(params.row[match[headerName]]) ? 1 : 0);
          debugger;
          break;
        case "Arr./Dep.":
          result.push(
            ["A", "D"].includes(params.row[match[headerName]]) ? 1 : 0
          );
          debugger;
          break;
      }
    });
  debugger;
  return result.reduce((a, b) => a * b, 1);
};
