import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import * as React from "react";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AppDataContext } from "../../context/CSV_editor/AppDataContext";
import TerminalGraphEditor from "./PfmGraphEditor";

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
    labels: data.rows.map((row) => row["From Time"]),
    datasets: [
      {
        label: "Wait North (minutes)",
        data: data.rows.map(
          (row) => Math.floor(row.T1InternationalSecurityNM4F_Queue_WaitB) / 60
        ),
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.main,
        yAxisID: "y",
      },
      {
        label: "Wait South (minutes)",
        data: data.rows.map(
          (row) => Math.floor(row.T1InternationalSecuritySM4F_Queue_WaitB) / 60
        ),
        borderColor: theme.palette.info.light,
        backgroundColor: theme.palette.info.light,
        yAxisID: "y",
      },
    ],
  };

  return (
    <Paper sx={{ padding: 1.5 }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Typography variant="h6" textAlign="center" sx={{ pt: 0, mt: 0 }}>
          Wait time
        </Typography>
        <Box sx={{ minHeight: "60vh" }}>
          <Line options={options} data={graphdata} />
        </Box>
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

          <Collapse in={editing}>
            <IconButton
              color="success"
              size="large"
              aria-label="add an alarm"
              onClick={handleClickStopEditing}
            >
              <DoneIcon fontSize="inherit" />
            </IconButton>
          </Collapse>
        </Box>
      </Box>
      <Box>
        <Collapse in={editing}>
          <TerminalGraphEditor processor={processor} />
        </Collapse>
      </Box>
    </Paper>
  );
}
