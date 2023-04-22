import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export default function ClearSelect() {
  const [score, setScore] = useState("");
  const handleClearClick = () => {
    setScore("");
  };

  const scoreData = ["100", "90", "80", "70", "60", "50", "40", "30"];

  const handleChange = (event) => {
    setScore(event.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      {score.length ? (
        <InputLabel id="custom-select-label">Score</InputLabel>
      ) : (
        ""
      )}
      <Select
        labelId="clearable-select-label"
        label={score.length ? "Score" : ""}
        id="clearable-select"
        value={score}
        onChange={handleChange}
        displayEmpty
        sx={{
          "& .MuiSelect-iconOutlined": { display: score ? "none" : "" },
          "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
        }}
        renderValue={(value) => (value ? value : <em>Nothing Selected</em>)}
        endAdornment={
          <IconButton
            sx={{ visibility: score ? "visible" : "hidden" }}
            onClick={handleClearClick}
          >
            <ClearIcon />
          </IconButton>
        }
      >
        {scoreData.map((scoreValue) => {
          return <MenuItem value={scoreValue}>{scoreValue}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
