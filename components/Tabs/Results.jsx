import * as React from "react";
import { useContext } from "react";
import FacilityGraph from "../UI/FacilityGraph";
import { AppDataContext } from "../context/AppDataContext";
import { useTheme } from "@mui/material/styles";
import { optionsProcessorGraph } from "../settings";
import cloneDeep from "lodash.clonedeep";
import FacilityResultCard from "../UI/FacilityResultsCard";
import { Stack, Box } from "@mui/material";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Stack
        container
        spacing={2}
        disableEqualOverflow
        justifyItems="center"
        alignItems="center"
        margin="auto"
      >
        {data.simresult &&
          Object.keys(data.terminal)
            .filter((key) => data.simresult[key])
            .map((key) => {
              const options = cloneDeep(optionsProcessorGraph);
              return (
                <Box width="100%" key={key}>
                  <Stack
                    direction="row"
                    gap={2}
                    justifyItems="center"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Box
                      minWidth="50vw"
                      maxWidth={{ xs: "100vw", md: "75vw" }}
                      flexGrow={1}
                    >
                      <FacilityGraph
                        key={key}
                        processor={key}
                        options={options}
                      />
                    </Box>
                    <FacilityResultCard processor={key} />
                  </Stack>
                </Box>
              );
            })}
      </Stack>
    </>
  );
};

export default App;
