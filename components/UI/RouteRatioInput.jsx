import * as React from "react";
import { useContext } from "react";
import { Stack, Box, Typography, Input } from "@mui/material";
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
    <Input
      onChange={handleInputChange}
      defaultValue={
        data.routes.filter(
          (route) => route.parent == parent && route.child == child
        )?.[0]?.ratio
      }
      endAdornment="%"
      sx={{ width: 50 }}
      size="small"
      inputProps={{
        step: 1,
        min: 0,
        max: 100,
        type: "number",
        "aria-labelledby": "input-slider",
      }}
    />
  );
}
