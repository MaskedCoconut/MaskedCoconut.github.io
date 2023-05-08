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
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { processortypes } from "../settings";
import MenuItem from "@mui/material/MenuItem";
import { timestep } from "../settings";
import { useState } from "react";

const halltypes = processortypes
  .filter((obj) => obj.type == "hall")
  .map((obj) => obj.name);

export default function OutlinedCard({ processor, keyprocessor }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  const [editing, setEditing] = React.useState(false);

  const [editedprocessor, setEditedprocessor] = useState({ ...processor });

  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 200,
      }}
      elevation={2}
    >
      <CardContent>
        <Stack spacing={1} margin="auto">
          {/* NAME */}

          <Stack direction="row">
            {!editing && <Typography>name:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["name"] = e.target.value;
                }}
                label="name"
                size="small"
                defaultValue={arrayAvg(processor["name"])}
              />
            ) : (
              <Typography>{arrayAvg(processor["name"])}</Typography>
            )}
          </Stack>

          {/* TYPE */}

          <Stack direction="row">
            {!editing && <Typography>type:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["type"] = e.target.value;
                  setEditedprocessor({ ...editedprocessor });
                }}
                select
                label="type"
                size="small"
                defaultValue={arrayAvg(processor["type"])}
                sx={{ minWidth: 225 }}
              >
                {processortypes.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <Typography>{arrayAvg(processor["type"])}</Typography>
            )}
          </Stack>

          {/* PREVIOUS STEP */}

          <Stack direction="row">
            {!editing && <Typography>previous step:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["previous step"] = e.target.value;
                }}
                select
                sx={{ minWidth: 225 }}
                label="previous step"
                size="small"
                defaultValue={arrayAvg(
                  processor["previous step"] == "showup"
                    ? "first step"
                    : data.terminal[processor["previous step"].toString()][
                        "name"
                      ]
                )}
              >
                {Object.keys(data.terminal).map((processor) => (
                  <MenuItem key={processor} value={processor}>
                    {data.terminal[processor].name}
                  </MenuItem>
                ))}
                <MenuItem value="showup">first step</MenuItem>
              </TextField>
            ) : (
              <Typography>
                {arrayAvg(
                  processor["previous step"] == "showup"
                    ? "first step"
                    : data.terminal[processor["previous step"].toString()][
                        "name"
                      ]
                )}
              </Typography>
            )}
          </Stack>

          {!halltypes.includes(editedprocessor.type) && (
            <>
              <Stack direction="row">
                {!editing && <Typography>processing time [s]:</Typography>}
                {editing ? (
                  <TextField
                    onChange={(e) => {
                      editedprocessor["processing time [s]"] = new Array(
                        (24 * 60) / timestep
                      ).fill(Number(e.target.value));
                    }}
                    size="small"
                    label="processing time [s]"
                    defaultValue={arrayAvg(processor["processing time [s]"])}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                ) : (
                  <Typography>
                    {arrayAvg(processor["processing time [s]"])}
                  </Typography>
                )}
              </Stack>

              <Stack direction="row">
                {!editing && <Typography>processor number:</Typography>}
                {editing ? (
                  <TextField
                    onChange={(e) => {
                      editedprocessor["processor number"] = new Array(
                        (24 * 60) / timestep
                      ).fill(Number(e.target.value));
                    }}
                    label="processor number"
                    size="small"
                    defaultValue={arrayAvg(processor["processor number"])}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                ) : (
                  <Typography>
                    {arrayAvg(processor["processor number"])}
                  </Typography>
                )}
              </Stack>
            </>
          )}

          {halltypes.includes(editedprocessor.type) && (
            <>
              <Stack direction="row">
                {!editing && <Typography>dwell time [m]:</Typography>}
                {editing ? (
                  <TextField
                    onChange={(e) => {
                      editedprocessor["dwell time [m]"] = new Array(
                        (24 * 60) / timestep
                      ).fill(Number(e.target.value));
                    }}
                    size="small"
                    label="dwell time [m]"
                    defaultValue={arrayAvg(processor["dwell time [m]"])}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                ) : (
                  <Typography>
                    {arrayAvg(processor["dwell time [m]"])}
                  </Typography>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>

      {/* ACTIONS */}

      <CardActions>
        {!editing && (
          <Button
            startIcon={<EditIcon />}
            onClick={() => setEditing(true)}
            variant="outlined"
          >
            Edit
          </Button>
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

const deleteprocessor = (data, dispatch, keyprocessor) => {
  delete data.terminal[keyprocessor];

  if (data?.simresult?.[keyprocessor]) {
    delete data.simresult[keyprocessor];
  }

  dispatch({ type: "setTerminal", newterminal: data.terminal });
};

const saveprocessor = (data, dispatch, editedprocessor, keyprocessor) => {
  data.terminal[keyprocessor] = editedprocessor;
  dispatch({ type: "setTerminal", newterminal: data.terminal });
};
