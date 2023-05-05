import {
  Box,
  Slider,
  Select,
  FormControl,
  InputLabel,
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

export default function RangeSlider() {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const [range, setRange] = useState([72, 144]);
  const [value, setValue] = useState();
  const [processor, setProcessor] = useState();

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

  const handleSelect = (event) => {
    setProcessor(event.target.value);
  };

  const handleClick = () => {
    range[1] += 1;
    data.terminal.security["processor number"].fill(value, ...range);
    dispatch({ type: "setTerminal", newterminal: { ...data.terminal } });
  };

  return (
    <div class="p-2 gap-3 max-w-fit min-w-min border-2 bg-indigo-500/50 border-gray-700 border-solid rounded-lg flex items-center justify-evenly flex flex-wrap m-auto">
      {/* processor select */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Processor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            size="small"
            id="demo-simple-select"
            value={processor}
            label="Processor"
            onChange={handleSelect}
          >
            {Object.keys(data.terminal).map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* number input */}
      <div class="w-8">
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
      </div>
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
    </div>
  );
}
