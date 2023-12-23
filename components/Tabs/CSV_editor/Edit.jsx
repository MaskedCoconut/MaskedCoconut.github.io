import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import cloneDeep from "lodash.clonedeep";
import { useContext } from "react";
import PfmGraph from "../../UI/CSV_editor/PfmGraph";
import ExcelExportButton from "../../UI/CSV_editor/csvExportButton";
import { AppDataContext } from "../../context/CSV_editor/AppDataContext";
import { optionsProcessorGraph } from "../../settingsCSV_editor";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const options = cloneDeep(optionsProcessorGraph);
  return (
    <>
      <Stack>
        <Box width="100%">{data.rows && <PfmGraph options={options} />}</Box>
        <ExcelExportButton
          data={data.rows}
          filename={data.file.name.replace(/(\.[^.]+)$/, "_edited$1")}
        />
      </Stack>
    </>
  );
};

export default App;
