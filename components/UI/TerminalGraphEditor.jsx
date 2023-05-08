import {
  Box,
  Slider,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Stack,
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
import Grid from "@mui/material/Unstable_Grid2";

const [min, max, step] = [0, 287, 1];

export default function TerminalGraphEditor({ processor }) {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const [range, setRange] = useState([72, 144]);
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
    const newrange = [...range];
    newrange[1] += 1;
    data.terminal?.[processor]?.[attribute].fill(value, ...newrange);
    dispatch({ type: "setTerminal", newterminal: { ...data.terminal } });
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
            <MenuItem value="processing time [s]">processing time [s]</MenuItem>
            <MenuItem value="processor number">processor number</MenuItem>
          </TextField>
        </Box>
        {/* number input */}
        <Box sx={{ width: 150 }}>
          <TextField
            value={value}
            size="small"
            label="value"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Box>
        {/* validation button */}
        <Button variant="contained" component="label" onClick={handleClick}>
          Set value
        </Button>
      </Stack>
      {/* slider */}
      <Grid xs={12}>
        <Box sx={{ maxWidth: "94%", margin: "auto" }}>
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
      </Grid>
    </Grid>
  );
}
