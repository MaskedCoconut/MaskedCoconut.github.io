import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";
import TextField from "@mui/material/TextField";
import { Chip, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { processortypes } from "../settings";
import MenuItem from "@mui/material/MenuItem";
import { timestep, processorcardWidth } from "../settings";
import { useState } from "react";
import { CustomsIcon } from "../icons/icons";
import Collapse from "@mui/material/Collapse";

const halltypes = processortypes
  .filter((obj) => obj.type == "hall")
  .map((obj) => obj.name);

export default function OutlinedCard({ processor, keyprocessor }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  const [editing, setEditing] = React.useState(false);

  const [editedprocessor, setEditedprocessor] = useState(processor);

  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditedprocessor({
      ...editedprocessor,
      // On autofill we get a stringified value.
      "previous steps": typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <Card elevation={4} sx={{ width: processorcardWidth }}>
      <CardContent
        sx={{
          padding: 2,
          paddingBottom: 0,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Typography
            variant="h5"
            color="secondary"
            align="center"
            flexGrow={1}
          >
            <CustomsIcon sx={{ mr: 1 }} />
            {arrayAvg(processor["name"])}
          </Typography>
        </Stack>
        {/* NAME */}

        <Collapse in={editing}>
          <Stack
            alignContent="center"
            justifyContent="center"
            sx={{ mt: 1 }}
            spacing={1.5}
            paddingLeft={2}
            paddingRight={2}
          >
            <TextField
              onChange={(e) => {
                editedprocessor["name"] = e.target.value;
              }}
              sx={{
                width: "100%",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
              size="small"
              label="name"
              defaultValue={arrayAvg(processor["name"])}
            />

            {/* TYPE */}

            <TextField
              onChange={(e) => {
                editedprocessor["type"] = e.target.value;
                setEditedprocessor({ ...editedprocessor });
              }}
              select
              label="type"
              sx={{
                width: "100%",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
              size="small"
              defaultValue={processor["type"]}
            >
              {processortypes.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            {/* previous steps */}

            <TextField
              select
              SelectProps={{
                multiple: true,
                onChange: handleMultiSelectChange,
                value: editedprocessor["previous steps"],
                renderValue: (selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          value == "showup"
                            ? "Show-up"
                            : data.terminal[value]?.name
                        }
                      />
                    ))}
                  </Box>
                ),
              }}
              label="previous steps"
              sx={{
                width: "100%",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
              size="small"
            >
              {Object.keys(data.terminal)
                .filter((id) => id != keyprocessor)
                .map((processor) => (
                  <MenuItem key={processor} value={processor}>
                    {data.terminal[processor].name}
                  </MenuItem>
                ))}
              <MenuItem value="showup">Show-up</MenuItem>
            </TextField>

            {!halltypes.includes(editedprocessor.type) && (
              <>
                {/* PROCESSING TIME */}
                <TextField
                  onChange={(e) => {
                    editedprocessor["processing time [s]"] = new Array(
                      (24 * 60) / timestep
                    ).fill(Number(e.target.value));
                  }}
                  sx={{
                    width: "100%",
                  }}
                  size="small"
                  label="processing time [s]"
                  defaultValue={arrayAvg(processor["processing time [s]"])}
                  inputProps={{
                    style: { textAlign: "center" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                {/* PROCESSOR NUMBER */}
                <TextField
                  onChange={(e) => {
                    editedprocessor["processor number"] = new Array(
                      (24 * 60) / timestep
                    ).fill(Number(e.target.value));
                  }}
                  label="processor number"
                  sx={{
                    width: "100%",
                  }}
                  size="small"
                  defaultValue={arrayAvg(processor["processor number"])}
                  inputProps={{
                    style: { textAlign: "center" },
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </>
            )}

            {/* DWELL TIME */}
            {halltypes.includes(editedprocessor.type) && (
              <TextField
                onChange={(e) => {
                  editedprocessor["dwell time [m]"] = new Array(
                    (24 * 60) / timestep
                  ).fill(Number(e.target.value));
                }}
                sx={{
                  width: "100%",
                }}
                size="small"
                label="dwell time [m]"
                defaultValue={arrayAvg(processor["dwell time [m]"])}
                inputProps={{
                  style: { textAlign: "center" },
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            )}

            {/* AREA */}

            <TextField
              onChange={(e) => {
                editedprocessor["area [sqm]"] = Number(e.target.value);
              }}
              sx={{
                width: "100%",
              }}
              size="small"
              label="area [sqm]"
              defaultValue={processor["area [sqm]"]}
              inputProps={{
                style: { textAlign: "center" },
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </Stack>
        </Collapse>
      </CardContent>

      {/* ACTIONS */}

      <CardActions>
        <Stack direction="row" justifyContent="flex-start" spacing={0}>
          {!editing && (
            <IconButton
              sx={{ pt: 0 }}
              color="primary"
              onClick={() => setEditing(true)}
            >
              <EditIcon />
            </IconButton>
          )}
          {editing && (
            <Button
              startIcon={<CancelIcon />}
              onClick={() => setEditing(false)}
              variant="outlined"
            >
              Cancel
            </Button>
          )}
          {editing && (
            <Button
              color="success"
              startIcon={<SaveIcon />}
              onClick={() => {
                setEditing(false);
                saveprocessor(data, dispatch, editedprocessor, keyprocessor);
              }}
              variant="outlined"
            >
              Save
            </Button>
          )}
          {editing && (
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setEditing(false);
                deleteprocessor(data, dispatch, keyprocessor);
              }}
              variant="outlined"
            >
              Delete
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}

const arrayAvg = (val) => {
  if (Array.isArray(val)) {
    return val.reduce((a, b) => a + b, 0) / val.length;
  } else {
    return String(val);
  }
};

export const deleteprocessor = (data, dispatch, keyprocessor) => {
  // remove processor from other processor previous step
  Object.entries(data.terminal).forEach(([_id, processor]) => {
    processor["previous steps"] = processor["previous steps"].filter(
      (step) => step != keyprocessor
    );
  });
  // remove routes involving the processor
  data.routes = data.routes.filter(
    (route) => route.parent != keyprocessor && route.child != keyprocessor
  );

  delete data.terminal[keyprocessor];
  delete data?.simresult?.[keyprocessor];
  dispatch({ type: "setTerminal", newterminal: data.terminal });
  dispatch({ type: "setRoutes", newroutes: data.routes });
};

const saveprocessor = (data, dispatch, editedprocessor, keyprocessor) => {
  data.terminal[keyprocessor] = editedprocessor;
  dispatch({ type: "setTerminal", newterminal: data.terminal });
};
