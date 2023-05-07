import * as React from "react";
import { useContext } from "react";
import { AppDataContext } from "../context/AppDataContext";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProcessorCard from "../UI/ProcessorCard";
import AddNewCard from "../UI/AddNewCard";

const App = () => {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {data.terminal &&
          Object.keys(data.terminal).map((key) => (
            <ProcessorCard
              processor={data.terminal[key]}
              keyprocessor={key}
              key={key}
            />
          ))}

        <AddNewCard />
      </Stack>
    </>
  );
};

export default App;
