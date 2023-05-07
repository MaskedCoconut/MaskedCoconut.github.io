import { Alert, Box, Snackbar } from "@mui/material";
import { useContext } from "react";
import Schedule from "../components/Tabs/schedule";
import Showup from "../components/Tabs/showup";
import Terminal from "../components/Tabs/terminal";
import Terminal2 from "../components/Tabs/terminal2";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/AppDataContext";

import { useState } from "react";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

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
      <TabPanel value={data.currenttab} index={3}>
        <Terminal2 />
      </TabPanel>
      {!!data.snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert {...data.snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
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
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
