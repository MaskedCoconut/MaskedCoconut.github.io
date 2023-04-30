import * as React from "react";
import LineChartTest from "../components/UI/showuplinechart";
import Link from "next/link";
import { Button } from "@mui/material";
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
    <Card className="max-w-lg">
      <LineChartTest />
      <Link href="/">
        <Button variant="contained" component="label">
          Back
        </Button>
      </Link>
    </Card>
  );
};

export default App;
