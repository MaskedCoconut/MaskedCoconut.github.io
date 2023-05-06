import { Stack, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { SELECTLIST } from "../settings";
import { getRowError, FilterObjectOnValue, getKeyByValue } from "../utils";

export default function BasicSelect({ buttonText, setButtonText }) {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  const choices = Object.keys(data.rows[0]).filter(
    (choice) => !["error"].includes(choice)
  );

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
      const updatedRows = data.rows.map((row) => {
        // replace all keys found in matchedHeaderName
        matchedHeaderNames.forEach((header) => {
          const newHeader = getKeyByValue(data.match, header);
          if (header != newHeader) {
            row[newHeader] = row[header];
            delete row[header];
          }
          row["error"] = getRowError(row);
        });
        return row;
      });

      dispatch({ type: "setRows", newrows: updatedRows });
      dispatch({ type: "setIsValidated", isvalidated: true });
      setButtonText("reload csv");
      dispatch({ type: "setMatch", match: "reinit" });
    }
  };

  return (
    <Stack
      padding={1}
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
                  display: "none",
                },
                "&.Mui-focused .MuiIconButton-root": {
                  color: "primary.main",
                },
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

      <Button
        variant="contained"
        component="label"
        onClick={handleMatchClick}
        disabled={data.isvalidated}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}
