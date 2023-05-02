import { Box } from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import TerminalChart from "../components/UI/terminalchart";
import { AppDataContext } from "../components/context/AppDataContext";

const App = () => {
  const data = useContext(AppDataContext);
  return <>{data.simresult && <TerminalChart />}</>;
};

export default App;
