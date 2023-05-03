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
import { timeFromatter } from "../utils";

import { DataGrid } from "@mui/x-data-grid";

const TerminalChart = () => {
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const dummy = new Array((24 * 60) / timestep).fill(0);
  const securityChart = {
    cols: [{ field: "metric" }].concat(
      dummy.map((val, id) =>
        Object.fromEntries([
          ["field", id],
          ["headerName", timeFromatter(id)],
          ["width", 10],
        ])
      )
    ),
    rows: [
      Object.assign(
        Object.fromEntries(
          dummy.map((val, id) => [
            id,
            data.terminal.security["processing time"],
          ])
        ),
        { metric: "processing time", id: 0 }
      ),
    ],
  };

  return (
    <>
      <DataGrid
        rows={securityChart.rows}
        density="compact"
        columns={securityChart.cols}
      />
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
