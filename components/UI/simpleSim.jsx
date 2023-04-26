import { PersonOutlineSharp } from "@mui/icons-material";
import * as React from "react";

const step = 5;

const test = {
  simulation: {
    processors: {
      processor1: {
        interactionTime: 10,
        processorNumber: 2,
        queueingArea: 200,
      },
      processor2: {
        interactionTime: 10,
        processorNumber: 2,
        queueingArea: 200,
      },
    },
    holdingArea: {
      holdingArea1: {
        dwellTime: 360,
        dwellArea: 400,
      },
    },
    sequence: {
      sequence: ["processor1", "processor2", "holdingArea"],
    },
  },
  results: {
    "test[simulation][sequence][0]": {
      inflow: [],
      outflow: [],
      queue: [],
    },
    "test[simulation][sequence][1]": {
      inflow: [],
      outflow: [],
      queue: [],
    },
    "test[simulation][sequence][2]": {
      inflow: [],
      outflow: [],
      queue: [],
    },
  },
  schedule: data,
  generate_showup: () => {
    // for each line of the schedule
    // take the number of Pax
    // apply show-up
  },
  showUpProfile: [
    3.16712e-5, 3.1538e-5, 5.96572e-5, 0.000109763, 0.000196431, 0.000341924,
    0.000578913, 0.000953368, 0.001527114, 0.002379285, 0.003605663,
    0.005314811, 0.007619992, 0.010626376, 0.014413845, 0.019016849,
    0.024404018, 0.030461285, 0.036982749, 0.043673127, 0.050164157,
    0.056045001, 0.060903802, 0.064374827, 0.066183833, 0.066183833,
    0.064374827, 0.060903802, 0.056045001, 0.050164157, 0.043673127,
    0.036982749, 0.030461285, 0.024404018, 0.019016849, 0.014413845,
    0.010626376, 0.007619992, 0.005314811, 0.003605663, 0.002379285,
    0.001527114, 0.000953368, 0.000578913, 0.000341924, 0.000196431,
    0.000109763, 5.96572e-5, 3.1538e-5, 1.62169e-5, 8.11087e-6, 3.94575e-6,
    1.86705e-6, 8.59298e-7, 3.84677e-7, 1.67499e-7, 7.09398e-8, 2.92235e-8,
    1.17095e-8, 4.56357e-9, 1.72996e-9,
  ], // index 0 = STD to std-5 , index 60 = STD-295 to STD-300
};

const skdToShowUp = (data, showUpProfile) => {
  // for each flight
  // add pax*showup with idx => ((STD//5) - idx) % 1440
  const result = Array(1440).fill(0);
  data.map(() => {
    showUpProfile.forEach((sup, idx) => {
      const destIndex = (Math.floor(result[data[stdMinutes]] / 5) - idx) % 1440;
      result[destIndex] += sup * data[Pax];
    });
  });
};
