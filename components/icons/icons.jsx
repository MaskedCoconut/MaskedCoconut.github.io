import Customs from "./customs.svg";
import { SvgIcon } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const CustomsIcon = () => (
  <IconButton>
    <SvgIcon color="primary" component={Customs} inheritViewBox />
  </IconButton>
);
