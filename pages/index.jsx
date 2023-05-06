import { Alert, Snackbar, Stack, Box, Typography } from "@mui/material";
import { useContext } from "react";
import DataGridDemo from "../components/UI/datagrid";
import SelectColumn from "../components/UI/select-column";
import UploadStack from "../components/UI/uploadstack";
import MRTdata from "../components/UI/MRTdata";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/AppDataContext";
import Schedule from "../components/Tabs/schedule";
import Showup from "../components/Tabs/showup";
import Terminal from "../components/Tabs/terminal";

import { useState } from "react";
import Slide from "@mui/material/Slide";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  // text change for the update columns button
  const [buttonText, setButtonText] = useState("Update columns");

  // shorthand
  const handleCloseSnackbar = () =>
    dispatch({
      type: "setSnackbar",
      snackbar: null,
    });

  return (
    <Box sx={{ width: "100%" }}>
      <TabPanel value={data.currenttab} index={0}>
        <Schedule />
      </TabPanel>
      <TabPanel value={data.currenttab} index={1}>
        <Showup />
      </TabPanel>
      <TabPanel value={data.currenttab} index={2}>
        <Terminal />
      </TabPanel>
    </Box>
  );
};

export default App;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
