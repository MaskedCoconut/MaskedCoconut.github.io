import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/material";

export default function BasicSelect(props) {
  const selectList = ["Airline", "Seats", "scheduled"];
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
    >
      {selectList.map((val) => (
        <Box key={"box" + val} sx={{ minWidth: 120 }}>
          <FormControl key={"form" + val} fullWidth>
            <InputLabel key={"input label" + val} id="demo-simple-select-label">
              {val}
            </InputLabel>
            <Select
              key={"select" + val}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label={val}
              onChange={handleChange}
            >
              {props.choices.map((val) => (
                <MenuItem key={val} value={val}>
                  {" "}
                  {val}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Stack>
  );
}
