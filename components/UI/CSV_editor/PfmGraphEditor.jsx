import { Box, Button, MenuItem, Slider, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext, useState } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../../context/CSV_editor/AppDataContext";

// Options for short date and time format
const DateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false, // Use 24-hour format
  timeZone: "Asia/Tokyo", // Set timezone to Japan
};

export default function TerminalGraphEditor({ processor }) {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const start_timestamp = Date.parse(data.rows[0]["From Time"]);
  const end_timestamp = Date.parse(
    data.rows[data.rows.length - 1]["From Time"]
  );
  const [min, max, step] = [start_timestamp, end_timestamp, 10 * 60 * 1000];
  const [range, setRange] = useState([start_timestamp, end_timestamp]);
  const [value, setValue] = useState();
  const [attribute, setAttribute] = useState();

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleSelectAttribute = (event) => {
    setAttribute(event.target.value);
  };

  const handleClick = () => {
    // const newrange = [...range];
    // newrange[1] += 1;
    // change rows
    data.rows.forEach((row) => {
      if (
        Date.parse(row["From Time"]) >= range[0] &&
        Date.parse(row["From Time"]) < range[1]
      ) {
        row[attribute] =
          row[attribute] > value * 60 ? value * 60 : row[attribute];
      }
    });
    // dispatch change
    dispatch({ type: "setRows", newrows: [...data.rows] });
  };

  return (
    <Grid
      container
      spacing={1}
      disableEqualOverflow
      justifyItems="center"
      alignItems="center"
      margin="auto"
    >
      <Stack
        padding={1}
        spacing={{ xs: 1, sm: 2, md: 4, xl: 6 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {/* attribute select */}
        <Box>
          <TextField
            select
            size="small"
            // value={attribute}
            label="Attribute"
            onChange={handleSelectAttribute}
            sx={{ width: 200, margin: "auto" }}
          >
            {/* <MenuItem value="processing time [s]">processing time [s]</MenuItem> */}
            <MenuItem value="T1InternationalSecurityNM4F_Queue_WaitB">
              North
            </MenuItem>
            <MenuItem value="T1InternationalSecuritySM4F_Queue_WaitB">
              South
            </MenuItem>
          </TextField>
        </Box>
        {/* number input */}
        <Box sx={{ width: 150 }}>
          <TextField
            value={value}
            size="small"
            label="value"
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Box>
        {/* validation button */}
        <Button variant="contained" component="label" onClick={handleClick}>
          Set Max queueing for period
        </Button>
      </Stack>
      {/* slider */}
      <Grid xs={12}>
        <Box sx={{ maxWidth: "94%", margin: "auto" }}>
          <Slider
            value={range}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={Datetimeformatter}
            valueLabelFormat={Datetimeformatter}
            min={min}
            max={max}
            step={step}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

const Datetimeformatter = (timestamp) => {
  const date = new Date(timestamp);

  // Options for formatting the date string
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "Asia/Tokyo", // Set timezone to UTC (or any other desired timezone)
  };

  // Format the date as a string
  const dateString = date.toLocaleString("ja-JP", options);
  return dateString;
};
