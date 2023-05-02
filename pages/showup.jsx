import { Button, Stack } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { useContext } from "react";
import LineChartTest from "../components/UI/showuplinechart";
import { AppDataContext } from "../components/context/AppDataContext";

const App = () => {
  const data = useContext(AppDataContext);
  return <div>{data.cols && <LineChartTest />}</div>;
};

export default App;
