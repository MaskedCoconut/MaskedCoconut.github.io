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
import { Box, Stack, Card, Paper, Typography, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
                  <Slider
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
