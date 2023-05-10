import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";
import { Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TerminalStep from "../UI/TerminalStep";
import TerminalStepAddNew from "../UI/TerminalStepAddNew";
import GroupsIcon from "@mui/icons-material/Groups";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ mr: 10 }}>
          <GroupsIcon sx={{ fontSize: 100 }} color="primary" />
        </Box>
        {data?.terminalsteps.map((stepID) => (
          <TerminalStep key={stepID} stepID={stepID} />
        ))}
        <TerminalStepAddNew />
      </Stack>
    </>
  );
};

export default App;
