import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  // LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Paper } from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import * as React from "react";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { AppDataContext } from "../context/AppDataContext";
import FacilityGraphEditor from "./FacilityGraphEditor";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { processortypes } from "../settings";

ChartJS.register(
  CategoryScale,
  LinearScale,
  // PointElement,
  // LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function LoSGraph({ processor }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: externalTooltipHandler,
        filter: (tooltipItem) => tooltipItem.raw > 0,
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  const graphdata = {
    labels: data.simresult[processor].map((row) => row["slot"]),
    datasets: [
      // should have 4 datasets (one per label)
      {
        label: "Optimal",
        // value is 1 when Optimal and 0 when suboptimum
        data: data.simresult[processor].map((row) =>
          row["LoS"] == "Optimal" ? 1 : ""
        ),
        borderColor: theme.palette.LoS["Optimal"],
        backgroundColor: theme.palette.LoS["Optimal"],
        barPercentage: 1,
        categoryPercentage: 1,
        inflateAmount: 2,
      },
      {
        label: "Sub-Optimal",
        // value is 1 when Optimal and 0 when suboptimum
        data: data.simresult[processor].map((row) =>
          row["LoS"] == "Sub-Optimal" ? 1 : ""
        ),
        borderColor: theme.palette.LoS["Sub-Optimal"],
        backgroundColor: theme.palette.LoS["Sub-Optimal"],
        barPercentage: 1,
        categoryPercentage: 1,
        inflateAmount: 2,
      },
      {
        label: "Over-Design",
        // value is 1 when Optimal and 0 when suboptimum
        data: data.simresult[processor].map((row) =>
          row["LoS"] == "Over-Design" ? 1 : ""
        ),
        borderColor: theme.palette.LoS["Over-Design"],
        backgroundColor: theme.palette.LoS["Over-Design"],
        barPercentage: 1,
        categoryPercentage: 1,
        inflateAmount: 2,
      },
      {
        label: "Under-Provided",
        // value is 1 when Optimal and 0 when suboptimum
        data: data.simresult[processor].map((row) =>
          row["LoS"] == "Under-Provided" ? 1 : ""
        ),
        borderColor: theme.palette.LoS["Under-Provided"],
        backgroundColor: theme.palette.LoS["Under-Provided"],
        barPercentage: 1,
        categoryPercentage: 1,
        inflateAmount: 2,
      },
    ],
  };

  return (
    <Box
      sx={{
        height: "10px",
        width: "90%",
        position: "relative",
        margin: "auto",
      }}
    >
      <Bar options={options} data={graphdata} />
    </Box>
  );
}

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;

      const th = document.createElement("th");
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};
