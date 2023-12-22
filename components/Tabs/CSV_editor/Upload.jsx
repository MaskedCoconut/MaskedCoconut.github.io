import { Stack } from "@mui/material";
import { useContext } from "react";
import Datagrid from "../../UI/CSV_editor/Datagrid";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../../context/CSV_editor/AppDataContext";

const App = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  return (
    <Stack minHeight={700}>
      <Datagrid />
    </Stack>
  );
};

export default App;
