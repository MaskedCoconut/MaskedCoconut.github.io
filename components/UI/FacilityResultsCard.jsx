import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";
import InfoIcon from "@mui/icons-material/Info";
import { timestep, processortypes, processorcardWidth } from "../settings";
import LoSbar from "./LoSbar";
import { MovingAverage, timeFromatter, halltypes } from "../utils";

export default function ShowUpCard({ processor }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  // calculer l'heure glissante avec la plus grande valeure de queue
  const MVA1HQueue = MovingAverage(
    data.simresult[processor].map(
      (row) => Math.floor(row["Queue [Pax]"] * 10) / 10
    ),
    60 / timestep
  );
  const busyIndex = MVA1HQueue.indexOf(Math.max(...MVA1HQueue));

  const processortype = processortypes.filter(
    (type) => type["name"] == data.terminal[processor].type
  )[0];

  const isHall = processortype.type == "hall";
  const sqmPaxlow = processortype.sqmPaxlow;
  const sqmPaxhigh = processortype.sqmPaxhigh;
  const area = data.terminal[processor]["area [sqm]"];
  const sqmPaxvalue =
    Math.floor(
      (area / data.simresult[processor][busyIndex]["Queue [Pax]"]) * 10
    ) / 10;

  const waitLow = !isHall && processortype.waitLow;
  const waitHigh = !isHall && processortype.waitHigh;
  const waitValue =
    !isHall &&
    Math.floor(data.simresult[processor][busyIndex]["Queue [min]"] * 10) / 10;

  // calculer les parametres LOS

  return (
    <Card>
      <Paper sx={{ width: 350, margin: "auto" }}>
        <CardContent>
          <Stack spacing={1} sx={{ mb: 1 }}>
            <Stack
              spacing={0}
              sx={{
                justifyContent: "flex-start",
                justifyItems: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 0,
                  pb: 0,
                  textAlign: "center",
                }}
                color="primary"
              >
                <InfoIcon sx={{ mr: 1 }} />
                {data.terminal[processor].name}
              </Typography>
            </Stack>

            {/* Busiest hour */}
            <Box spacing={0}>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                    color="secondary"
                  >
                    {timeFromatter(busyIndex)}
                  </Typography>
                </Stack>
              </Box>
              <Tooltip title="5-min slot when the Centered Moving Average (1 hour) of queue is the highest">
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mt: 0,
                      pt: 0,
                      fontStyle: "oblique",
                      textAlign: "left",
                    }}
                  >
                    Busiest hour (CMA)
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Stack>
          <Divider />

          <Stack sx={{ mt: 1 }} spacing={1}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 0, pt: 0, fontWeight: "bold", textAlign: "left" }}
            >
              Space LoS [sqm/Pax]
            </Typography>
            <Box>
              <LoSbar
                low={sqmPaxlow}
                high={sqmPaxhigh}
                value={sqmPaxvalue}
                type="space"
              />
            </Box>
            {!isHall && (
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 0, pt: 0, fontWeight: "bold", textAlign: "left" }}
                >
                  wait LoS [min]
                </Typography>
                <LoSbar
                  low={waitLow}
                  high={waitHigh}
                  value={waitValue}
                  type="wait"
                />
              </Box>
            )}
          </Stack>
        </CardContent>
      </Paper>
    </Card>
  );
}
