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
import { Line } from "react-chartjs-2";
import * as React from "react";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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
      text: "Security area",
    },
    legend: {
      position: "chartArea",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
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
    },
    y: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "Pax/h",
      },
      position: "left",
      border: {
        display: false,
        dash: [4, 4],
      },
    },
    y1: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "Pax",
      },
      position: "right",
      grid: {
        drawborder: false,
        display: false,
      },
      border: {
        display: false,
        drawborder: false,
      },
    },
  },
};

export default function App() {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  const graphdata = {
    labels: data.simresult.map((row) => row["slot"]),
    datasets: [
      {
        label: "Show-up [Pax/h]",
        data: data.simresult.map((row) => Math.floor(row["Show-up [Pax/h]"])),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        yAxisID: "y",
      },
      {
        label: "Security queue [Pax]",
        data: data.simresult.map((row) =>
          Math.floor(row["Security queue [Pax]"])
        ),
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: "y",
      },
      {
        label: "Security lanes",
        data: data.terminal.security["processor number"],
        borderColor: theme.palette.warning.main,
        backgroundColor: theme.palette.warning.main,
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={graphdata} />;
}
