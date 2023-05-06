import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { AppDataContext } from "../context/AppDataContext";

export default function OutlinedCard({ processor }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <Card sx={{ minWidth: 275, minHeight: 200 }} elevation={2}>
      <CardContent>
        {Object.keys(processor).map((key) => (
          <Typography>
            {key} : {formatvalue(processor[key])}
          </Typography>
        ))}
      </CardContent>
      {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
  );
}

const formatvalue = (val) => {
  if (Array.isArray(val)) {
    return val.reduce((a, b) => a + b, 0) / val.length;
  } else {
    return String(val);
  }
};
