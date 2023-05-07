import {
  Box,
  Slider,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Paper,
  MenuItem,
  Input,
  Button,
} from "@mui/material";
import { timeFromatter } from "../utils";
import { useContext, useState } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

const [min, max, step] = [0, 287, 1];

export default function TerminalSimpleEditor() {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const [range, setRange] = useState([72, 144]);
  const [value, setValue] = useState();
  const [processor, setProcessor] = useState();
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

  const handleSelectProcessor = (event) => {
    setProcessor(event.target.value);
  };

  const handleSelectAttribute = (event) => {
    setAttribute(event.target.value);
  };

  const handleClick = () => {
    const newrange = [...range];
    newrange[1] += 1;
    data.terminal?.[processor]?.[attribute].fill(value, ...newrange);
    dispatch({ type: "setTerminal", newterminal: { ...data.terminal } });
  };

  return (
    <Paper>
      <Box>
        {/* processor select */}
        <TextField
          select
          size="small"
          // value={processor}
          label="Processor"
          onChange={handleSelectProcessor}
          sx={{ width: 200, margin: "auto" }}
        >
          {Object.keys(data.terminal).map((val) => (
            <MenuItem key={data.terminal[val]["name"]} value={val}>
              {data.terminal[val]["name"]}
            </MenuItem>
          ))}
        </TextField>
      </Box>

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
          <MenuItem value="processing time">processing time</MenuItem>
          <MenuItem value="processor number">processor number</MenuItem>
        </TextField>
      </Box>
      {/* number input */}
      <Box sx={{ width: 50 }}>
        <Input
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: step,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Box>
      {/* slider */}
      <Box sx={{ minWidth: 300 }}>
        <Slider
          value={range}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          getAriaValueText={timeFromatter}
          valueLabelFormat={timeFromatter}
          min={min}
          max={max}
          step={step}
        />
      </Box>
      {/* validation button */}
      <Button variant="contained" component="label" onClick={handleClick}>
        {" "}
        bim{" "}
      </Button>
    </Paper>
  );
}
