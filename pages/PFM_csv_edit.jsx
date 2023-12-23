import { Alert, Box, Snackbar } from "@mui/material";
import { useContext } from "react";
import Edit from "../components/Tabs/CSV_editor/Edit";
import Upload from "../components/Tabs/CSV_editor/Upload";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../components/context/CSV_editor/AppDataContext";
import Layout from "../components/structure/CSV_editor/layout";

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
        <Upload />
      </TabPanel>
      <TabPanel value={data.currenttab} index={1}>
        <Edit />
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

App.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
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
