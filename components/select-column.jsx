import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { Stack } from "@mui/material";

const selectList = [
  "Flight Number",
  "Flight Date",
  "Scheduled Time",
  "Arr./Dep.",
  "Int./Dom.",
  "T1/T2",
  "Intl Regions",
  "Category(P/C/O)",
  "SEATS",
  "PAX",
];

const SearchObjectForValue = (obj, val) => {
  const asArray = Object.entries(obj);
  const filteredArray = asArray.filter(([key, value]) => value === val);
  const filteredObject = Object.fromEntries(filteredArray);
  const result = Object.fromEntries(
    Object.keys(filteredObject).map((key) => [key, ""])
  );
  return result;
};

export default function BasicSelect(props) {
  // Store the match between template (define above)
  // and the column chosen by user
  const [match, setMatch] = React.useState(
    Object.fromEntries(selectList.map((col) => [col, ""]))
  );

  const handleClearClick = (col) => {
    const deletedValue = Object.fromEntries([[col, ""]]);
    console.log(deletedValue);
    // Update the match Object
    setMatch((match) => ({
      ...match,
      ...deletedValue,
    }));

    console.log(match);
  };

  const handleChange = (e) => {
    // record the updated value
    const updatedValue = Object.fromEntries([[e.target.name, e.target.value]]);
    // take out the value if it is already somewhere
    const reinitValues = SearchObjectForValue(match, e.target.value);
    console.log(reinitValues);
    // Update the match Object
    setMatch((match) => ({
      ...match,
      ...updatedValue,
      ...reinitValues,
    }));
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
              {props.choices.map((val) => (
                <MenuItem key={val} value={val}>
                  {" "}
                  {val}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Stack>
  );
}
