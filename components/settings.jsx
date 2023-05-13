// App title
export const appTitle = "LoS-App";

// Allowed extensions for input file
export const ALLOWEDEXTENSIONS = ["csv"];

// UI size constants
export const processorcardWidth = 333;
export const stepminheight = 300;

// default timestep in minutes
export const timestep = 5;

// List of destination columns to match
export const SELECTLIST = [
  // "Flight Number",
  // "Flight Date",
  "Scheduled Time",
  // "Arr./Dep.",
  // "Int./Dom.",
  // "T1/T2",
  // "Intl Regions",
  // "Category(P/C/O)",
  // "Seats",
  "Pax",
];

// Types of processor
export const processortypes = [
  {
    name: "Public dep./arr. halls",
    type: "hall",
    sqmPaxlow: 2,
    sqmPaxhigh: 2.3,
  },
  {
    name: "Check-in - SSK",
    type: "processor",
    sqmPaxlow: 1.3,
    sqmPaxhigh: 1.8,
    waitLow: 1,
    waitHigh: 2,
  },
  {
    name: "Check-in - Bag Drop",
    type: "processor",
    sqmPaxlow: 1.3,
    sqmPaxhigh: 1.8,
    waitLow: 1,
    waitHigh: 5,
  },
  {
    name: "Check-in - Desk",
    type: "processor",
    sqmPaxlow: 1.3,
    sqmPaxhigh: 1.8,
    waitLow: 10,
    waitHigh: 20,
  },
  {
    name: "Security",
    type: "processor",
    sqmPaxlow: 1,
    sqmPaxhigh: 1.2,
    waitLow: 5,
    waitHigh: 10,
  },
  {
    name: "Border control - auto",
    type: "processor",
    sqmPaxlow: 1,
    sqmPaxhigh: 1.2,
    waitLow: 1,
    waitHigh: 5,
  },
  {
    name: "Border control - staffed",
    type: "processor",
    sqmPaxlow: 1,
    sqmPaxhigh: 1.2,
    waitLow: 5,
    waitHigh: 10,
  },
  { name: "Gate / lounges", type: "hall", sqmPaxlow: 1.2, sqmPaxhigh: 2.2 },
  { name: "Bag claim", type: "hall", sqmPaxlow: 1.5, sqmPaxhigh: 1.7 },
  {
    name: "Customs control",
    type: "processor",
    sqmPaxlow: 1.3,
    sqmPaxhigh: 1.8,
    waitLow: 1,
    waitHigh: 5,
  },
];

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
        text: "[Pax/h]  [Pax]",
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
    y1: {
      type: "linear",
      beginAtZero: true,
      title: {
        display: true,
        text: "[n]  [sec]  [min]",
        color: "#21222c",
        font: {
          size: 14,

          weight: 400,
        },
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
      ticks: { color: "#21222c" },
    },
  },
};
