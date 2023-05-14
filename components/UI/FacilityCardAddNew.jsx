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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { timestep, processortypes, processorcardWidth } from "../settings";

export default function OutlinedCard({ stepID }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  return (
    <Button
      onClick={() => {
        handleNewProcessor(data, dispatch, stepID);
      }}
      variant="outlined"
      size="large"
      sx={{
        border: 3,
        borderStyle: "dashed",
        margin: "auto",
        "&:hover": {
          border: 3,
          borderStyle: "dashed",
        },
      }}
      startIcon={<AddCircleOutlineIcon sx={{ fontSize: "large" }} />}
    >
      Facility
    </Button>
  );
}

const handleNewProcessor = (data, dispatch, stepID) => {
  const newkey =
    "id" +
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36);

  data.terminal[newkey] = {
    isFirstStep: true,
    name: "new process",
    icon: "WaitingareaIcon",
    type: processortypes[0].name,
    stepID: stepID,
    "previous steps": [],
    "processing time [s]": new Array((24 * 60) / timestep).fill(10),
    "processor number": new Array((24 * 60) / timestep).fill(13),
    "dwell time [m]": new Array((24 * 60) / timestep).fill(10),
    "area [sqm]": 100,
  };

  dispatch({ type: "setTerminal", newterminal: data.terminal });
};
