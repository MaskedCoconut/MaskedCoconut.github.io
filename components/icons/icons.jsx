import Customs from "./customs.svg";
import { Box, SvgIcon } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const CustomsIcon = (props) => (
  <SvgIcon sx={props.sx} color="secondary" component={Customs} inheritViewBox />
);
