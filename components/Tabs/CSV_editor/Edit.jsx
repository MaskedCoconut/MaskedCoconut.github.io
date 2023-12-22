import { useTheme } from "@mui/material/styles";
import cloneDeep from "lodash.clonedeep";
import { useContext } from "react";
import PfmGraph from "../../UI/CSV_editor/PfmGraph";
import { AppDataContext } from "../../context/AppDataContext";
import { optionsProcessorGraph } from "../../settingsCSV_editor";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const options = cloneDeep(optionsProcessorGraph);
  return (
    <>
      <PfmGraph options={options} />
    </>
  );
};

export default App;
