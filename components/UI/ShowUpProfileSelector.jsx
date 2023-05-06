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

import { Toggle, ToggleItem } from "@tremor/react";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  // handle show-up type change
  const handleTypeChange = (type, data) => {
    const newShowup = {
      ...data.showup,
      ...{ type: type },
    };
    dispatch({ type: "setShowup", newshowup: newShowup });
  };

  return (
    <>
      <Card>
        <Paper sx={{ width: 250, margin: "auto" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              <EditIcon />
              Edit Show-up Profile
            </Typography>
            <Stack
              direction="column"
              justifyItems="center"
              alignItems="center"
              spacing={1}
            >
              <Toggle
                defaultValue="default"
                onValueChange={(value) => {
                  handleTypeChange(value, { ...data });
                }}
              >
                <ToggleItem value="default" text="Default" />
                <ToggleItem
                  value="normdist"
                  text="Norm. dist."
                  icon={FunctionsIcon}
                />
              </Toggle>
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
