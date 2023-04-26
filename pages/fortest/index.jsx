import * as React from "react";
import { Card, Title, BarChart, LineChart, Subtitle } from "@tremor/react";
import LineChartTest from "../../components/linecharttest";
import Link from "next/link";

const App = () => {
  return( <LineChartTest />
  <Link href="/showup">
            <Button variant="contained" component="label">
              To showup
            </Button>
          </Link>
  );
};

export default App;
