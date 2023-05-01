import { LineChart, Card, Title, BarChart } from "@tremor/react";
import * as React from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useContext } from "react";
import { Stack } from "@mui/material";

const showUpProfile = [
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

const skdToShowUp = (data, showUpProfile) => {
  // for each flight
  const result = Array(288).fill(0);

  data
    .filter((row) => row.Pax)
    .map((row) => {
      const originTime = "2022-10-13 ";
      const date = new Date([originTime, row["Scheduled Time"]].join(" "));
      const std5Minutes = Math.floor(
        (date.getMinutes() + date.getHours() * 60) / 5
      );

      showUpProfile.forEach((sup, idx) => {
        const destIndex = (std5Minutes - idx) % 288;
        result[destIndex < 0 ? result.length + destIndex : destIndex] +=
          sup * row.Pax;
      });
    });
  return result;
};

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us")
    .format(Math.round(number * 12))
    .toString()}`;

const timeFromatter = (slot5m) => {
  const h = Math.floor((slot5m * 5) / 60);
  const m = (slot5m * 5) % 60;
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
};

const App = () => {
  const data = useContext(AppDataContext);
  const showuparray = skdToShowUp(data.rows, showUpProfile);
  const chartdata = showuparray.map((val, id) =>
    Object.fromEntries([
      ["slot", timeFromatter(id)],
      ["Pax/h", val],
    ])
  );

  return (
    <Card className="mx-auto">
      <Title>Show-up profile generated from schedule</Title>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="slot"
        categories={["Pax/h"]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default App;
