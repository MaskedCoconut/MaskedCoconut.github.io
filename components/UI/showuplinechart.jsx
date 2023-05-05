import FunctionsIcon from "@mui/icons-material/Functions";
import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import Slider from "./slider";
import { useTheme } from "@mui/material/styles";
import { Toggle, ToggleItem } from "@tremor/react";
import ProfileChart from "./ProfileChart";
import ShowUpChart from "./ShowUpChart";

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
        <ToggleItem value="normdist" text="Norm. dist." icon={FunctionsIcon} />
      </Toggle>
      <div class="min-w-screen p-6 min-h-[40vh] flex items-center justify-center">
        {data.profiledata && <ProfileChart />}
      </div>
      <div class="min-w-screen p-6 min-h-[40vh] flex items-center justify-center">
        <ShowUpChart />
      </div>
    </>
  );
};

export default App;
