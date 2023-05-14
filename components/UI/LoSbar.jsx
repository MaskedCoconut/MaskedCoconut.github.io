import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";
import InfoIcon from "@mui/icons-material/Info";
import { timestep, processortypes, processorcardWidth } from "../settings";

export default function ShowUpCard({ low, high, value, type }) {
  const theme = useTheme();

  //
  const unitSuffix = type == "space" ? "sqm" : "min";

  // constants
  const totalwidth = 280;
  const barheight = 10;
  const markerheight = 20;
  const markerwidth = 10;

  // colors
  const colorWidth0 = theme.palette.LoS["Under-Provided"];
  const colorWidth1 =
    type == "space"
      ? theme.palette.LoS["Sub-Optimal"]
      : theme.palette.LoS["Over-Design"];
  const colorWidth2 =
    type == "space"
      ? theme.palette.LoS["Optimal"]
      : theme.palette.LoS["Optimal"];
  const colorWidth3 =
    type == "space"
      ? theme.palette.LoS["Over-Design"]
      : theme.palette.LoS["Sub-Optimal"];

  const markercolor =
    value < high
      ? value > low
        ? colorWidth2
        : value < 0.8 * low && type == "space"
        ? colorWidth0
        : colorWidth1
      : colorWidth3;

  const [start, end] =
    value < 2 * high - low
      ? value > low - (high - low)
        ? // value est ok , on fait 3 tiers
          [low - (high - low), 2 * high - low]
        : // cas ou value est plus petite que low-high
          [value, high * 1.2]
      : // cas ou value est plus haute que low+high
        [low * 0.8, value];

  const scale = totalwidth / (end - start);

  const width0 =
    type == "space" ? (start < 0.8 * low ? scale * (0.8 * low - start) : 0) : 0;
  const width1 = (low - start) * scale - width0;
  const width2 = (high - low) * scale;
  const width3 = (end - high) * scale;

  return (
    <Box>
      <Box sx={{ mt: 4, mb: 4, position: "relative" }}>
        <Stack direction="row" spacing={0}>
          <Tooltip title="Under-Provided">
            <Box
              width={width0}
              height={10}
              sx={{
                backgroundColor: colorWidth0,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
          </Tooltip>
          <Tooltip title={type == "space" ? "Sub-Optimal" : "Over-Design"}>
            <Box
              width={width1}
              height={10}
              sx={{
                backgroundColor: colorWidth1,
                borderTopLeftRadius: width0 > 0 ? 0 : 8,
                borderBottomLeftRadius: width0 > 0 ? 0 : 8,
              }}
            />
          </Tooltip>
          <Tooltip title="Optimal">
            <Box
              width={width2}
              height={10}
              sx={{ backgroundColor: colorWidth2 }}
            />
          </Tooltip>
          <Tooltip title={type == "space" ? "Over-Design" : "Sub-Optimal"}>
            <Box
              width={width3}
              height={10}
              sx={{
                backgroundColor: colorWidth3,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              }}
            />
          </Tooltip>
        </Stack>
        {/* Under-Provided text text */}
        {width0 > 0 && (
          <Box
            sx={{
              position: "absolute",
              left: width0 - 8,
              top: 0.75 * markerheight,
            }}
          >
            <Typography sx={{ fontSize: 16, textAlign: "center" }}>
              {0.8 * low}
            </Typography>
          </Box>
        )}

        {/* low text */}
        <Box
          sx={{
            position: "absolute",
            left: width0 + width1 - 8,
            top: 0.75 * markerheight,
          }}
        >
          <Typography sx={{ fontSize: 16, textAlign: "center" }}>
            {low}
          </Typography>
        </Box>

        {/* high text */}
        <Box
          sx={{
            // border: 1,
            position: "absolute",
            left: width0 + width1 + width2 - 8,
            top: 0.75 * markerheight,
          }}
        >
          <Typography sx={{ fontSize: 16, textAlign: "center" }}>
            {high}
          </Typography>
        </Box>

        {/* marker and text */}
        <Box
          sx={{
            position: "absolute",
            left: (value - start) * scale - 25,
            top: -3.75 * barheight,
          }}
        >
          <Typography
            noWrap
            sx={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              textAlign: "center",
              color: markercolor,
            }}
          >
            {value} {unitSuffix}
          </Typography>
        </Box>
        <Tooltip title="value at busiest hour">
          <Box
            width={markerwidth}
            height={markerheight}
            sx={{
              position: "absolute",
              left: (value - start) * scale - 2,
              top: -0.5 * barheight,
              backgroundColor: markercolor,
              border: 2,
              borderColor: "#fcfcfc",
              borderRadius: 8,
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
}
