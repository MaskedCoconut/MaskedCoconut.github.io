import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ShowUpChart from "../UI/ShowUpChart";
import ShowUpCard from "../UI/ShowUpCard";
import ShowUpProfileChart from "../UI/ShowUpProfileChart";
import ShowUpProfileCard from "../UI/ShowUpProfileCard";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);

  return (
    <>
      <Stack
        container
        spacing={2}
        justifyItems="center"
        alignItems="center"
        margin="auto"
      >
        {/* Showup */}

        <Stack
          direction="row"
          gap={2}
          justifyItems="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box
            minWidth="50vw"
            maxWidth={{ xs: "100vw", md: "70vw" }}
            flexGrow={1}
          >
            {data?.rows && data?.simresult?.showup && <ShowUpChart />}
          </Box>
          <Box>{data?.rows && data?.simresult?.showup && <ShowUpCard />}</Box>
        </Stack>

        {/* Profile */}

        <Stack
          direction="row"
          gap={2}
          justifyItems="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box>{data.profiledata && <ShowUpProfileCard />}</Box>
          <Box
            minWidth="50vw"
            maxWidth={{ xs: "100vw", md: "70vw" }}
            flexGrow={1}
          >
            {data.profiledata && <ShowUpProfileChart />}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default App;
