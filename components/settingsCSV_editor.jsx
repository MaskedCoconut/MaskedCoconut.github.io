// Graphjs Options for Processor
export const optionsProcessorGraph = {
  font: { family: '"Georgia","Segoe UI","Helvetica","Arial","sans-serif"' },
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
      display: false,
      text: "Title",
      font: {
        size: 20,

        weight: 400,
      },
      color: "#21222c",
      padding: 0,
    },
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        font: {
          size: 14,

          weight: 400,
        },
        color: "#21222c",
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
      radius: 0.5,
    },
    line: {
      borderWidth: 0.5,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 24,
        minRotation: 45,
        color: "#21222c",
      },
    },
    y: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "[minutes - 分]",
        color: "#21222c",
        font: {
          size: 14,

          weight: 400,
        },
      },
      position: "left",
      border: {
        display: false,
        dash: [4, 4],
      },
      ticks: { color: "#21222c" },
    },
  },
};
