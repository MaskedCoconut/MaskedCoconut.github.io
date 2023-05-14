import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Card, Paper } from "@mui/material";

import { Bar } from "react-chartjs-2";
import * as React from "react";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { percentageFormatter } from "../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Show-up Profile",
    },
    legend: {
      position: "chartArea",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
      },
      cursor: "pointer",
      onHover: (event, ChartElement) => {
        event.native.target.style.cursor = "pointer";
      },

      onLeave: (event, ChartElement) => {
        event.native.target.style.cursor = "default";
      },
    },
  },
  elements: {
    point: {
      radius: 2,
    },
    line: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
      beginAtZero: true,
      title: {
        display: true,
        text: "time before departure",
      },
    },
    y1: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "Pax arriving [ % ]",
      },
      position: "left",
      border: {
        display: false,
        dash: [4, 4],
      },
    },

    y2: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "Pax arrived [ % ]",
      },
      position: "right",
      border: {
        display: false,
        dash: [4, 4],
      },
    },
  },
};

export default function App() {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  const profileData = data.profiledata
    .toReversed()
    .map((row) => Math.floor(row["Show-up Profile"] * 100 * 100) / 100);

  const profileDatacumsum = profileData.map((_val, id) =>
    profileData.slice(0, id + 1).reduce((x, y) => x + y)
  );

  const graphdata = {
    labels: data.profiledata.toReversed().map((row) => row["slot"]),
    datasets: [
      {
        label: "Show-up Profile [%]",
        type: "bar",
        data: profileData,
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.main,
        yAxisID: "y1",
        order: 2,
      },
      {
        label: "Show-up Profile (cumul.) [%]",
        type: "line",
        data: profileDatacumsum,
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: "y2",
        order: 1,
      },
    ],
  };

  return (
    <Paper>
      <Box sx={{ minHeight: "40vh" }}>
        <Bar options={options} data={graphdata} />
      </Box>
    </Paper>
  );
}
