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

export default function BasicSelect() {
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
      const matchedHeaderNames = Object.values(data.match).filter((x) => x);
      const updatedCols = data.cols
        // filter to not recreate "error" column
        .filter((col) => col.field != "error")
        .map((col) =>
          matchedHeaderNames.includes(col["headerName"]) &&
          col["headerName"] != ""
            ? Object.fromEntries([
                ["field", ...getKeyByValue(data.match, col["headerName"])],
                ["headerName", ...getKeyByValue(data.match, col["headerName"])],
                ["flex", 1],
                ["editable", true],
              ])
            : col
        );
      const updatedColsAndError = updatedCols.concat(
        Object.fromEntries([
          ["field", "error"],
          ["headerName", "error"],
          ["flex", 1],
          ["editable", false],
          ["valueGetter", (params) => getRowError(params, data)],
        ])
      );

      const updatedRows = data.rows.map((row) => {
        // replace all keys found in matchedHeaderName
        matchedHeaderNames
          // .filter((matchedHeaderName) => !Object.keys(row).includes(SELECTLIST))
          .forEach((header) => {
            const newHeader = getKeyByValue(data.match, header);
            if (header != newHeader) {
              row[newHeader] = row[header];
              delete row[header];
            }
          });
        return row;
      });

      dispatch({ type: "setCols", newcols: updatedColsAndError });
      dispatch({ type: "setRows", newrows: updatedRows });
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
const getRowError = (params, data) => {
  const result = [1];
  const errors = [];
  const colFieldList = Object.keys(data.rows[0]);

  SELECTLIST.filter((field) => colFieldList.includes(field)).forEach(
    (field) => {
      switch (field) {
        case "Flight Date":
          if (Date.parse(params.row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Flight Date");
          }
          break;
        case "Scheduled Time":
          const originTime = "2022-10-13 ";
          if (Date.parse([originTime, params.row[field]].join(" "))) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Scheduled Time");
          }
          break;
        case "Arr./Dep.":
          if (["A", "D"].includes(params.row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Arr./Dep.");
          }
          break;
        case "Pax":
          if (!isNaN(params.row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Pax");
          }
          break;
      }
    }
  );
  return result.reduce((a, b) => a * b, 1) == 1
    ? "valid row"
    : errors.join("|");
};
