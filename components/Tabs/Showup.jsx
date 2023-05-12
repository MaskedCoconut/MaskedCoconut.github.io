import * as React from "react";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ProfileChart from "../UI/ProfileChart";
import ShowUpChart from "../UI/ShowUpChart";
import ShowUpCard from "../UI/ShowUpCard";
import ShowUpProfileSelector from "../UI/ShowUpProfileSelector";

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
            {data?.simresult?.showup && <ShowUpChart />}
          </Box>
          <Box>{data?.simresult?.showup && <ShowUpCard />}</Box>
        </Stack>

        {/* Profile */}

        <Stack
          direction="row"
          gap={2}
          justifyItems="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box>{data.profiledata && <ShowUpProfileSelector />}</Box>
          <Box
            minWidth="50vw"
            maxWidth={{ xs: "100vw", md: "70vw" }}
            flexGrow={1}
          >
            {data.profiledata && <ProfileChart />}
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default App;
