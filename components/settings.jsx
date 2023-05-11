// App title
export const appTitle = "LoS-App";

// Allowed extensions for input file
export const ALLOWEDEXTENSIONS = ["csv"];

// UI size constants
export const processorcardWidth = 333;
export const stepminheight = 300;

// List of destination columns to match
export const SELECTLIST = [
  "Flight Number",
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

// default show-up profile when toggled "default"
export const defaultShowUpProfile = [
  3.16712e-5, 3.1538e-5, 5.96572e-5, 0.000109763, 0.000196431, 0.000341924,
  0.000578913, 0.000953368, 0.001527114, 0.002379285, 0.003605663, 0.005314811,
  0.007619992, 0.010626376, 0.014413845, 0.019016849, 0.024404018, 0.030461285,
  0.036982749, 0.043673127, 0.050164157, 0.056045001, 0.060903802, 0.064374827,
  0.066183833, 0.066183833, 0.064374827, 0.060903802, 0.056045001, 0.050164157,
  0.043673127, 0.036982749, 0.030461285, 0.024404018, 0.019016849, 0.014413845,
  0.010626376, 0.007619992, 0.005314811, 0.003605663, 0.002379285, 0.001527114,
  0.000953368, 0.000578913, 0.000341924, 0.000196431, 0.000109763, 5.96572e-5,
  3.1538e-5, 1.62169e-5, 8.11087e-6, 3.94575e-6, 1.86705e-6, 8.59298e-7,
  3.84677e-7, 1.67499e-7, 7.09398e-8, 2.92235e-8, 1.17095e-8, 4.56357e-9,
  1.72996e-9,
]; // index 0 = STD to std-5 , index 60 = STD-295 to STD-300

// default timestep in minutes
export const timestep = 5;

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
    sqmPaxlow: 1.2,
    sqmPaxhigh: 1,
    waitLow: 5,
    waitHigh: 10,
  },
  {
    name: "Border control - auto",
    type: "processor",
    sqmPaxlow: 1.2,
    sqmPaxhigh: 1,
    waitLow: 1,
    waitHigh: 5,
  },
  {
    name: "Border control - staffed",
    type: "processor",
    sqmPaxlow: 1.2,
    sqmPaxhigh: 1,
    waitLow: 5,
    waitHigh: 10,
  },
  { name: "Gate / lounges", type: "hall", sqmPaxlow: 1.2, sqmPaxhigh: 2.2 },
  { name: "Bag claim", type: "hall", sqmPaxlow: 1.5, sqmPaxhigh: 1.7 },
  {
    name: "Customs control",
    type: "processor",
    sqmPaxlow: 1.8,
    sqmPaxhigh: 1.3,
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
