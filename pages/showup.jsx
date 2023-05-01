import { Button, Stack } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { useContext } from "react";
import LineChartTest from "../components/UI/showuplinechart";
import { AppDataContext } from "../components/context/AppDataContext";

const App = () => {
  const data = useContext(AppDataContext);
  return (
    <div>
      <Stack width="100%">
        {data.cols && <LineChartTest />}
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
