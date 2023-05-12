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

export default function ShowUpCard() {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  const showupArray = data.simresult.showup.map(
    (row) => row["Show-up [Pax/h]"]
  );
  const peakhourPax = Math.floor(
    Math.max(...MovingAverage(showupArray, 60 / timestep))
  );
  const totalPax =
    Math.floor(((showupArray.reduce((x, y) => x + y) / 60) * timestep) / 10) *
    10;

  const totalMov = data.rows.length;

  const peakhourMov = 12;

  return (
    <Card>
      <Paper sx={{ width: 350, margin: "auto" }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              margin: "auto",
              mb: 2,
              textAlign: "center",
            }}
            color="primary"
          >
            <InfoIcon sx={{ mr: 1 }} />
            Design Day Facts
          </Typography>

          <Stack spacing={1}>
            {/* Pax/day */}
            <Box spacing={0}>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                    color="secondary"
                  >
                    {totalPax.toLocaleString()}
                  </Typography>
                  <Typography variant="h5">[Pax/day]</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 0, pt: 0, fontStyle: "oblique", textAlign: "left" }}
                >
                  Total Pax
                </Typography>
              </Box>
            </Box>
            {/* Pax/hour */}
            <Box spacing={0}>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {peakhourPax.toLocaleString()}
                  </Typography>
                  <Typography variant="h5">[Pax/h]</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 0, pt: 0, fontStyle: "oblique", textAlign: "left" }}
                >
                  Peak hour Passengers
                </Typography>
              </Box>
            </Box>
            {/* Flight/day */}
            <Box spacing={0}>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Typography
                    color="secondary"
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                  >
                    {totalMov.toLocaleString()}
                  </Typography>
                  <Typography variant="h5">[Mov/day]</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 0, pt: 0, fontStyle: "oblique", textAlign: "left" }}
                >
                  Total Movements
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Paper>
    </Card>
  );
}

export const MovingAverage = (array, window) => {
  // centered and considering a "rotating" array
  const before = Math.floor(window / 2);
  const after = Math.floor(window / 2) + (window % 2);

  //...
  const triplearray = [...array].concat([...array]).concat([...array]);

  const result = array.map((_val, id) => {
    const newid = id + array.length;
    return triplearray
      .slice(newid - before, newid + after)
      .reduce((x, y) => x + y);
  });

  return result.map((x) => x / window);
};
