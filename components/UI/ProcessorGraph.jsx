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
    ],
  };

  return (
    <Paper>
      <div class="p2 min-h-[40vh]">
        <Line options={options} data={graphdata} />
      </div>
    </Paper>
  );
}
