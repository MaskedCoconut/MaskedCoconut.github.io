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

  const runSecurity = () => {
    const empty = new Array((24 * 60) / timestep).fill(0);

    // net Pax added to queue (when >0) or capacity left (when <0)
    const net_diff = empty.map(
      (val, id) =>
        data.simresult[id]["Pax/h"] -
        (data.terminal.security["processor number"] * timestep * 60) /
          data.terminal.security["processing time"]
    );

    // cumsum of previous
    net_diff.forEach((val, id) => {
      if (id > 0) {
        if (empty[id - 1] + net_diff[id] > 0) {
          empty[id] = empty[id - 1] + net_diff[id];
        } else {
          empty[id] = 0;
        }
      } else {
        if (net_diff > 0) {
          empty[id] = net_diff[id];
        }
      }
    });

    const newchartdata = data.simresult.map((row, id) => {
      return { ...row, ...{ "Security queue": empty[id] } };
    });

    dispatch({ type: "setSimresult", newsimresult: newchartdata });
  };

  return (
    <>
      <Card>
        <Button size="xs" onClick={runSecurity}>
          run security
        </Button>
        {true && (
          <LineChart
            className="mt-6"
            data={data.simresult}
            index="slot"
            categories={["Pax/h", "Security queue"]}
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
  `${Intl.NumberFormat("us").format(Math.round(number)).toString()} Pax`;
