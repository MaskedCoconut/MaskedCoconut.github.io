import FunctionsIcon from "@mui/icons-material/Functions";
import {
  BarChart,
  Card,
  Flex,
  LineChart,
  TextInput,
  Title,
  Toggle,
  ToggleItem,
} from "@tremor/react";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import Slider from "./slider";
import { defaultShowUpProfile, timestep } from "../settings";
import { erf } from "mathjs";
import { Button } from "@tremor/react";

const App = () => {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  var usedShowUpProfile = [];
  switch (data.showup.type) {
    case "default":
      usedShowUpProfile = defaultShowUpProfile;
      break;

    case "normdist":
      usedShowUpProfile = generateNormShowupProfile(
        data.showup.mean,
        data.showup.stdev
      );
  }

  const showuparray = skdToShowUp(data.rows, usedShowUpProfile);
  const chartdata = showuparray.map((val, id) =>
    Object.fromEntries([
      ["slot", timeFromatter(id)],
      ["Pax/h", val],
    ])
  );
  const profiledata = usedShowUpProfile.map((val, id) =>
    Object.fromEntries([
      ["slot", timeFromatter(id)],
      ["Pax/h", val],
    ])
  );
  const reversedprofiledata = profiledata.reverse();

  const handleSaveShowUp = () => {
    dispatch({ type: "setSimresult", newsimresult: chartdata });
  };

  const handleTypeChange = (type, data) => {
    const newShowup = {
      ...data.showup,
      ...{ type: type },
    };
    dispatch({ type: "setShowup", newshowup: newShowup });
  };

  return (
    <>
      <Card>
        <Flex>
          <Title>Design day show-up</Title>
          <Button size="xs" onClick={handleSaveShowUp}>
            Save this showup
          </Button>
        </Flex>
        <BarChart
          className="mt-6"
          data={data.simresult}
          index="slot"
          categories={["Pax/h"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Card>
      <Card>
        <Flex>
          <Title>Show-up profile</Title>
          <Toggle
            defaultValue="default"
            onValueChange={(value) => handleTypeChange(value, data)}
          >
            <ToggleItem value="default" text="Default" />
            <ToggleItem
              value="normdist"
              text="Norm. dist."
              icon={FunctionsIcon}
            />
          </Toggle>
          {data.showup.type == "normdist" && (
            <>
              <Slider
                title="mean"
                step={1}
                min={0}
                max={150}
                value={data.showup.mean}
                setValue={(mean) => {
                  dispatch({
                    type: "setShowup",
                    newshowup: { ...data.showup, ...{ mean: mean } },
                  });
                }}
              />
              <Slider
                title="std dev"
                step={1}
                min={0}
                max={60}
                value={data.showup.stdev}
                setValue={(stdev) => {
                  dispatch({
                    type: "setShowup",
                    newshowup: { ...data.showup, ...{ stdev: stdev } },
                  });
                }}
              />
            </>
          )}
        </Flex>
        <BarChart
          className="mt-6"
          data={reversedprofiledata}
          index="slot"
          categories={["Pax/h"]}
          colors={["blue"]}
          valueFormatter={percentageFormatter}
        />
      </Card>
    </>
  );
};

export default App;

const skdToShowUp = (data, showUpProfile) => {
  // for each flight
  const result = Array((24 * 60) / timestep).fill(0);

  data
    .filter((row) => row.Pax)
    .map((row) => {
      const originTime = "2022-10-13 ";
      const date = new Date([originTime, row["Scheduled Time"]].join(" "));
      const std5Minutes = Math.floor(
        (date.getMinutes() + date.getHours() * 60) / timestep
      );

      showUpProfile.forEach((sup, idx) => {
        const destIndex = (std5Minutes - idx) % ((24 * 60) / timestep);
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

const percentageFormatter = (number) => `${(number * 100).toFixed(2)}%`;

const timeFromatter = (slot5m) => {
  const h = Math.floor((slot5m * timestep) / 60);
  const m = (slot5m * timestep) % 60;
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
};

function cdfNormal(x, mean, standardDeviation) {
  return (1 - erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
}

function generateNormShowupProfile(mean, stdev) {
  const startArray = new Array((5 * 60) / timestep).fill(0);
  return startArray.map(
    (val, idx) =>
      cdfNormal(idx * timestep, mean, stdev) -
      cdfNormal((idx - 1) * timestep, mean, stdev)
  );
}
