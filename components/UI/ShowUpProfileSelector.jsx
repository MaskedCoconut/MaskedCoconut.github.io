import FunctionsIcon from "@mui/icons-material/Functions";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import Slider from "./slider";
import { Stack, Card, Paper, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  // handle show-up type change
  const handleTypeChange = (_event, newtype) => {
    if (newtype !== null) {
      const newShowup = {
        ...data.showup,
        ...{ type: newtype },
      };
      dispatch({ type: "setShowup", newshowup: newShowup });
    }
  };

  return (
    <>
      <Card>
        <Paper sx={{ width: 250, margin: "auto" }}>
          <CardContent>
            <Typography
              variant="body1"
              sx={{ margin: "auto", paddingBottom: 1 }}
              gutterBottom
            >
              <EditIcon color="primary" sx={{ marginRight: 2 }} />
              Edit Show-up Profile
            </Typography>
            <Stack
              direction="column"
              justifyItems="center"
              alignItems="center"
              spacing={1}
            >
              <ToggleButtonGroup
                exclusive
                value={data.showup.type}
                onChange={handleTypeChange}
              >
                <ToggleButton value="default" sx={{ fontSize: 12 }}>
                  Default
                </ToggleButton>
                <ToggleButton value="normdist" sx={{ fontSize: 12 }}>
                  <FunctionsIcon /> Norm. dist.
                </ToggleButton>
              </ToggleButtonGroup>
              {data.showup.type == "normdist" && (
                <>
                  <Slider
                    title="mean"
                    step={1}
                    min={0}
                    max={150}
                    value={data.showup.mean}
                    setValue={(mean) => {
                      dispatch({
                        type: "setShowup",
                        newshowup: { ...data.showup, ...{ mean: mean } },
                      });
                    }}
                  />
                  <Slider
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
                </>
              )}
            </Stack>
          </CardContent>
        </Paper>
      </Card>
    </>
  );
};

export default App;
