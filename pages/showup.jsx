import { Box } from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import LineChartTest from "../components/UI/showuplinechart";
import { AppDataContext } from "../components/context/AppDataContext";

const App = () => {
  const data = useContext(AppDataContext);
  return <>{data.rows && <LineChartTest />}</>;
};

export default App;
