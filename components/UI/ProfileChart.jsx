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
      // title: {
      //   display: true,
      //   text: "Pax/h",
      // },
      position: "left",
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

  const graphdata = {
    labels: data.profiledata.toReversed().map((row) => row["slot"]),
    datasets: [
      {
        label: "Show-up Profile",
        data: data.profiledata
          .toReversed()
          .map((row) => row["Show-up Profile"]),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        yAxisID: "y",
      },
    ],
  };

  return <Bar options={options} data={graphdata} />;
}
