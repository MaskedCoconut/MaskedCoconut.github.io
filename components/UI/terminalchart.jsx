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

const TerminalChart = () => {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  return (
    <>
      <Card>
        {true && (
          <LineChart
            className="mt-6"
            data={data.simresult}
            index="slot"
            categories={["Show-up [Pax/h]", "Security queue [Pax]"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
          />
        )}
      </Card>
    </>
  );
};

export default TerminalChart;

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(Math.round(number)).toString()}`;
