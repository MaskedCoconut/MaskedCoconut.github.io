import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Slider from "@mui/material/Slider";

import { Collapse } from "@mui/material";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  const [selected, setSelected] = React.useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  return (
    <Card>
      <Paper sx={{ width: 350, margin: "auto" }}>
        <CardContent>
          <Stack justifyItems="center" alignItems="center" spacing={1}>
            <Box>
              <Button variant="outlined" onClick={handleToggle}>
                <Typography
                  // variant="h6"
                  sx={{
                    margin: "auto",
                    //   mb: 2,
                    textAlign: "center",
                  }}
                  color="primary"
                >
                  <EditIcon sx={{ mr: 1 }} />
                  Edit Show-up Profile
                </Typography>
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Collapse sx={{ width: "100%" }} in={selected}>
                <Stack sx={{ width: "100%" }} spacing={0}>
                  <InputSlider
                    title="mean"
                    step={1}
                    min={0}
                    max={240}
                    value={data.showup.mean}
                    setValue={(mean) => {
                      dispatch({
                        type: "setShowup",
                        newshowup: { ...data.showup, ...{ mean: mean } },
                      });
                    }}
                  />
                  <InputSlider
                    title="std dev"
                    step={1}
                    min={0}
                    max={60}
                    value={data.showup.stdev}
                    setValue={(stdev) => {
                      dispatch({
                        type: "setShowup",
                        newshowup: { ...data.showup, ...{ stdev: stdev } },
                      });
                    }}
                  />
                </Stack>
              </Collapse>
            </Box>
          </Stack>
        </CardContent>
      </Paper>
    </Card>
  );
};

export default App;

function InputSlider({ title, step, min, max, value, setValue }) {
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <Box sx={{ padding: 2, width: "100%" }}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row">
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={min}
          max={max}
          step={step}
        />

        <TextField
          value={value}
          size="small"
          sx={{ width: 71 }}
          variant="standard"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: "number",
            style: { textAlign: "center" },
          }}
        />
      </Stack>
    </Box>
  );
}
