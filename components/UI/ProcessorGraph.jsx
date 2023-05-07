import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import * as React from "react";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { AppDataContext } from "../context/AppDataContext";
import TerminalGraphEditor from "./TerminalGraphEditor";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App({ processor, options }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  const [editing, setEditing] = React.useState(false);

  const handleClickEditing = () => {
    setEditing(true);
  };

  const handleClickStopEditing = () => {
    setEditing(false);
  };

  const graphdata = {
    labels: data.simresult[processor].map((row) => row["slot"]),
    datasets: [
      {
        label: "Show-up [Pax/h]",
        data: data.simresult[processor].map((row) =>
          Math.floor(row["Show-up [Pax/h]"])
        ),
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.main,
        yAxisID: "y",
      },
      {
        label: "Output [Pax/h]",
        data: data.simresult[processor].map((row) =>
          Math.floor(row["Output [Pax/h]"])
        ),
        borderColor: theme.palette.info.light,
        backgroundColor: theme.palette.info.light,
        yAxisID: "y",
      },
      {
        label: "Queue [Pax]",
        data: data.simresult[processor].map((row) =>
          Math.floor(row["Queue [Pax]"])
        ),
        borderColor: theme.palette.info.dark,
        backgroundColor: theme.palette.info.dark,
        yAxisID: "y",
      },
      {
        label: "Processor number",
        data: data.terminal[processor]["processor number"],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: "y1",
      },
      {
        label: "Processing time",
        data: data.terminal[processor]["processing time"],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <Paper sx={{ padding: 1 }}>
      <Box
        sx={{
          height: "40vh",
          width: "100%",
          position: "relative",
        }}
      >
        <Line options={options} data={graphdata} />
        <Box
          sx={{
            width: 45,
            position: "absolute",
            bottom: "-3px",
            right: "0px",
          }}
        >
          {!editing && (
            <IconButton
              color="primary"
              size="large"
              aria-label="add an alarm"
              onClick={handleClickEditing}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}

          {editing && (
            <IconButton
              color="success"
              size="large"
              aria-label="add an alarm"
              onClick={handleClickStopEditing}
            >
              <DoneIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box>{editing && <TerminalGraphEditor processor={processor} />}</Box>
    </Paper>
  );
}
