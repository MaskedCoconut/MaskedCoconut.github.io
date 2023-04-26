import * as React from "react";
import { Card, Title, BarChart, LineChart, Subtitle } from "@tremor/react";
import LineChartTest from "../components/UI/showupchart";
import Layout from "../components/layout";
import Link from "next/link";
import { Button } from "@mui/material";

const App = () => {
  return (
    <Layout>
      <LineChartTest />{" "}
      <Link href="/">
        <Button variant="contained" component="label">
          Back
        </Button>
      </Link>
    </Layout>
  );
};

export default App;
