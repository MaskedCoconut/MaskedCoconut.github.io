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
import { dataFormatter, percentageFormatter } from "../utils";
import { useTheme } from "@mui/material/styles";
import ProfileChart from "./ProfileChart";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  // handle show-up type change
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
          {/* <Title>Show-up profile</Title> */}
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
          <Toggle
            defaultValue="default"
            onValueChange={(value) => {
              handleTypeChange(value, { ...data });
            }}
          >
            <ToggleItem value="default" text="Default" />
            <ToggleItem
              value="normdist"
              text="Norm. dist."
              icon={FunctionsIcon}
            />
          </Toggle>
        </Flex>
        <div class="min-w-screen p-6 min-h-[40vh] flex items-center justify-center">
          {data.profiledata && <ProfileChart />}
        </div>
        {/* <BarChart
          className="mt-6"
          data={data.profiledata ? data.profiledata.toReversed() : null}
          index="slot"
          categories={["Show-up Profile"]}
          colors={["blue"]}
          valueFormatter={percentageFormatter}
        /> */}
      </Card>
      <Card>
        <Flex>{/* <Title>Design day show-up</Title> */}</Flex>
        <BarChart
          className="mt-6"
          data={data.simresult}
          // data={chartdata}
          index="slot"
          categories={["Show-up [Pax/h]"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </>
  );
};

export default App;
