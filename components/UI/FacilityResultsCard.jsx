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
import { arrayAvg } from "./FacilityCard";

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

  // requirements as per IATA formula
  // depends on previous process, button to "make all Optimal?"
  const maxShowup = Math.max(
    ...MovingAverage(
      data.simresult[processor].map((obj) => obj["Show-up [Pax/h]"]),
      12
    )
  );

  const req_proc =
    !isHall &&
    Math.round(
      (maxShowup * arrayAvg(data.terminal[processor]["processing time [s]"])) /
        60 /
        (60 + (waitHigh + waitLow) / 2)
    );

  const req_sqm = !isHall
    ? Math.round(
        (((req_proc * (waitHigh + waitLow)) / 2) * (sqmPaxhigh + sqmPaxlow)) /
          2 /
          (arrayAvg(data.terminal[processor]["processing time [s]"]) / 60)
      )
    : Math.round(
        (Math.max(
          ...data.simresult[processor].map((obj) => obj["Queue [Pax]"])
        ) *
          (sqmPaxhigh + sqmPaxlow)) /
          2
      );

  return (
    <Card>
      <Paper sx={{ width: 350, margin: "auto" }}>
        <CardContent>
          <Stack spacing={0.5} sx={{ mb: 0.5 }}>
            {/* title */}
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

            {/* Busiest hour */}
            <Box spacing={0}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
                color="secondary"
              >
                {timeFromatter(busyIndex)}
              </Typography>
              <Tooltip title="5-min slot when the Centered Moving Average (1 hour) of queue is the highest">
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
              </Tooltip>
            </Box>
          </Stack>
          <Divider />

          {/* LoS stack */}

          <Stack sx={{ mt: 1, mb: 2 }} spacing={0.75}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 0, pt: 0, fontWeight: "bold", textAlign: "center" }}
            >
              LoS [sqm/Pax]
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
              <Typography
                variant="subtitle1"
                sx={{ mt: 0, pt: 0, fontWeight: "bold", textAlign: "center" }}
              >
                LoS [min]
              </Typography>
            )}
            {!isHall && (
              <Box>
                <LoSbar
                  low={waitLow}
                  high={waitHigh}
                  value={waitValue}
                  type="wait"
                />
              </Box>
            )}
          </Stack>

          <Divider />

          {/* requirements stack */}

          <Stack sx={{ mt: 1 }} spacing={0.5}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 0, pt: 0, fontWeight: "bold", textAlign: "center" }}
            >
              Optimal requirements
            </Typography>
            <Stack direction="row">
              <Typography>area: {req_sqm} [sqm]</Typography>
              {!isHall && <Typography>Processors: {req_proc}</Typography>}
            </Stack>
          </Stack>
        </CardContent>
      </Paper>
    </Card>
  );
}
