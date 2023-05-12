import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import TextField from "@mui/material/TextField";
import { IconButton, Paper, Stack, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { processorcardWidth, processortypes } from "../settings";
import MenuItem from "@mui/material/MenuItem";
import { timestep, stepminheight } from "../settings";
import { useState } from "react";
import { deleteprocessor } from "./ProcessorCard";

import ProcessorCard from "./ProcessorCard";
import AddNewCard from "./AddNewCard";
import { ArcherElement } from "react-archer";
import RouteRatioInput from "../UI/RouteRatioInput";

export default function TerminalStep({ stepID }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  const relationsprocessors = (currentprocessor) => {
    return Object.keys(data.terminal)
      .filter((processor) =>
        data.terminal[processor]["previous steps"].includes(currentprocessor)
      )
      .map((processor) =>
        Object.fromEntries([
          ["targetId", processor],
          ["targetAnchor", "left"],
          ["sourceAnchor", "right"],
          [
            "label",
            <RouteRatioInput
              key={processor}
              parent={currentprocessor}
              child={processor}
            />,
          ],
          ["style", { strokeDasharray: "3,3" }],
        ])
      );
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#f5f9fd",
        minWidth: processorcardWidth,
      }}
      elevation={2}
    >
      <Stack
        spacing={2}
        sx={{ padding: 1, minHeight: stepminheight }}
        justifyContent="space-between"
      >
        {data.terminal &&
          Object.keys(data.terminal)
            .filter((processor) => data.terminal[processor].stepID == stepID)
            .map((processor) => (
              <ArcherElement
                key={processor}
                id={processor}
                relations={relationsprocessors(processor)}
              >
                <Box>
                  <ProcessorCard
                    processor={data.terminal[processor]}
                    keyprocessor={processor}
                    key={processor}
                  />
                </Box>
              </ArcherElement>
            ))}
        <Box>
          <AddNewCard stepID={stepID} />
        </Box>
        <IconButton
          onClick={() => deletestep(stepID, data, dispatch)}
          sx={{ alignSelf: "flex-end" }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    </Paper>
  );
}

const deletestep = (stepID, data, dispatch) => {
  // delete all processors in step
  Object.keys(data.terminal)
    .filter((processor) => data.terminal[processor].stepID == stepID)
    .forEach((processor) => deleteprocessor(data, dispatch, processor));
  // delete step
  data.terminalsteps = data.terminalsteps.filter((val, key) => val != stepID);
  // update Appdata
  dispatch({ type: "setTerminalsteps", newterminalsteps: data.terminalsteps });
};
