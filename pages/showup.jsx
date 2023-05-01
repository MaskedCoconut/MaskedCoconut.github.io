import * as React from "react";
import LineChartTest from "../components/UI/showuplinechart";
import Link from "next/link";
import { Button, Stack } from "@mui/material";
import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";

const App = () => {
  return (
    <div>
      <Stack width="100%">
        <LineChartTest />
        <Link href="/">
          <Button variant="contained" component="label">
            Back
          </Button>
        </Link>
      </Stack>
    </div>
  );
};

export default App;
