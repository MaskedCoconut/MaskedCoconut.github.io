import * as React from "react";
import { useContext } from "react";
import {
  Stack,
  Box,
  Typography,
  Input,
  TextField,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { percentageFormatter } from "../utils";
import { useTheme } from "@mui/material/styles";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
export default function RouteRatioInput({ parent, child }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);

  // data.routes is like [{parent: key, child: key, ratio: number},{},...]
  const handleInputChange = (e) => {
    const updatedroute = {
      parent: parent,
      child: child,
      ratio: e.target.value,
    };

    const newroutes = data.routes
      .filter((route) => !(route.parent == parent && route.child == child))
      .concat(updatedroute);

    dispatch({ type: "setRoutes", newroutes: newroutes });
  };

  return (
    <TextField
      onChange={handleInputChange}
      defaultValue={
        data.routes.filter(
          (route) => route.parent == parent && route.child == child
        )?.[0]?.ratio
      }
      sx={{ width: 71 }}
      variant="standard"
      size="small"
      inputProps={{
        min: 0,
        max: 100,
        type: "number",
        style: { textAlign: "center" },
        // alternative to "number"
        // inputMode: "numeric",
        // pattern: "[0-9]*",
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
    />
  );
}
