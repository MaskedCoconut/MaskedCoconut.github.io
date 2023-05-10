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
import {
  timestep,
  processortypes,
  stepminheight,
  processorcardWidth,
} from "../settings";

export default function TerminalStepAddNew() {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  return (
    <Button
      onClick={() => {
        handleNewStep(data, dispatch);
      }}
      variant="outlined"
      size="large"
      sx={{
        border: 3,
        borderStyle: "dashed",
        minHeight: stepminheight,
        width: processorcardWidth * 1.1,
        "&:hover": {
          border: 3,
          borderStyle: "dashed",
        },
      }}
      startIcon={<AddCircleOutlineIcon sx={{ fontSize: "large" }} />}
    >
      Step
    </Button>
  );
}

const handleNewStep = (data, dispatch) => {
  const newStepID = "step" + (data?.terminalsteps.length + 1);

  data.terminalsteps.push(newStepID);

  dispatch({ type: "setTerminalsteps", newterminalsteps: data.terminalsteps });
};
