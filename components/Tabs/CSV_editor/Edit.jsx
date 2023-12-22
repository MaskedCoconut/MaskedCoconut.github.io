import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { AppDataContext } from "../../context/AppDataContext";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Stack
        container
        spacing={2}
        disableEqualOverflow
        justifyItems="center"
        alignItems="center"
        margin="auto"
      ></Stack>
    </>
  );
};

export default App;
