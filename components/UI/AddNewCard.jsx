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
import { timestep } from "../settings";

export default function OutlinedCard() {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  return (
    <Box
      sx={{
        minWidth: 275,
        minHeight: 200,
      }}
    >
      <Button
        onClick={() => {
          handleNewProcessor(data, dispatch);
        }}
        variant="outlined"
        size="large"
        sx={{
          border: 3,
          borderStyle: "dashed",
          minWidth: 275,
          minHeight: 200,
          "&:hover": {
            border: 3,
            borderStyle: "dashed",
          },
        }}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add New
      </Button>
    </Box>
  );
}

const handleNewProcessor = (data, dispatch) => {
  const newkey = "process" + (Object.keys(data.terminal).length + 1);
  data.terminal[newkey] = {
    isFirstStep: true,
    name: "new process",
    type: "security",
    "previous step": "showup",
    "processing time": new Array((24 * 60) / timestep).fill(10),
    "processor number": new Array((24 * 60) / timestep).fill(10),
  };

  dispatch({ type: "setTerminal", newterminal: data.terminal });
};
