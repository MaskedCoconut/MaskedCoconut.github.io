import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
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

  const markercolor =
    value < high
      ? value > low
        ? theme.palette.LoS["Optimal"]
        : theme.palette.LoS["Sub-Optimal"]
      : theme.palette.LoS["Over-Design"];

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

  const width1 = (low - start) * scale;
  const width2 = (high - low) * scale;
  const width3 = (end - high) * scale;

  return (
    <Box>
      <Box sx={{ mt: 4, mb: 4, position: "relative" }}>
        <Stack direction="row" spacing={0}>
          <Box
            width={width1}
            height={10}
            sx={{
              backgroundColor: theme.palette.LoS["Sub-Optimal"],
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          />
          <Box
            width={width2}
            height={10}
            sx={{ backgroundColor: theme.palette.LoS["Optimal"] }}
          />
          <Box
            width={width3}
            height={10}
            sx={{
              backgroundColor: theme.palette.LoS["Over-Design"],
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        </Stack>
        {/* low text */}
        <Box
          sx={{
            position: "absolute",
            left: width1 - 8,
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
            left: width1 + width2 - 8,
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
      </Box>
    </Box>
  );
}
