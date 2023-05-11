import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";
import { Stack, Box, Typography, Input } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TerminalStep from "../UI/TerminalStep";
import TerminalStepAddNew from "../UI/TerminalStepAddNew";
import GroupsIcon from "@mui/icons-material/Groups";
import { ArcherContainer, ArcherElement } from "react-archer";
import RouteRatioInput from "../UI/RouteRatioInput";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const archerRef = React.useRef(null);

  const relationsShowup = Object.keys(data.terminal)
    .filter((processor) =>
      data.terminal[processor]["previous steps"].includes("showup")
    )
    .map((processor) =>
      Object.fromEntries([
        ["targetId", processor],
        ["targetAnchor", "left"],
        ["sourceAnchor", "right"],
        [
          "label",
          <RouteRatioInput key={processor} parent="showup" child={processor} />,
        ],
        ["style", { strokeDasharray: "3,3" }],
      ])
    );

  // fix a bug with archer, the arrow library
  React.useEffect(() => {
    setTimeout(() => archerRef.current?.refreshScreen(), 10); // refresh in timer
  });

  return (
    <>
      <Box>
        <ArcherContainer
          strokeColor={theme.palette.primary.dark}
          ref={archerRef}
          svgContainerStyle={{ pointerEvents: "none" }}
        >
          <Stack
            spacing={{ xs: 15 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <ArcherElement id="showup" relations={relationsShowup}>
              <Box
                sx={{
                  mr: 0,
                  ml: 0,
                  border: 1,
                  borderColor: theme.palette.primary.main,
                  borderRadius: 3,
                  padding: 2,
                }}
              >
                <GroupsIcon sx={{ fontSize: 100 }} color="secondary" />
                <Typography align="center" color="secondary" variant="h6">
                  Show-up
                </Typography>
              </Box>
            </ArcherElement>

            {data?.terminalsteps.map((stepID) => (
              <TerminalStep key={stepID} stepID={stepID} />
            ))}
            <TerminalStepAddNew />
          </Stack>
        </ArcherContainer>
      </Box>
    </>
  );
};

export default App;
