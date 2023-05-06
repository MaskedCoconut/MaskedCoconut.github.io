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

export default function OutlinedCard({ processor, keyprocessor, prout }) {
  const theme = useTheme();
  const data = useContext(AppDataContext);
  const dispatch = useContext(AppDataDispatchContext);
  const [editing, setEditing] = React.useState(false);

  const editedprocessor = { ...processor };
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
          <Stack direction="row">
            {!editing && <Typography>name:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["name"] = e.target.value;
                }}
                label="name"
                size="small"
                defaultValue={formatvalue(processor["name"])}
              />
            ) : (
              <Typography>{formatvalue(processor["name"])}</Typography>
            )}
          </Stack>

          <Stack direction="row">
            {!editing && <Typography>type:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["type"] = e.target.value;
                }}
                select
                label="type"
                size="small"
                defaultValue={formatvalue(processor["type"])}
                sx={{ minWidth: 225 }}
              >
                {processortypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <Typography>{formatvalue(processor["type"])}</Typography>
            )}
          </Stack>

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
                defaultValue={formatvalue(processor["previous step"])}
              >
                {Object.keys(data.terminal).map((processor) => (
                  <MenuItem
                    key={data.terminal[processor].name}
                    value={data.terminal[processor].name}
                  >
                    {data.terminal[processor].name}
                  </MenuItem>
                ))}

                <MenuItem value="first step">first step</MenuItem>
              </TextField>
            ) : (
              <Typography>{formatvalue(processor["previous step"])}</Typography>
            )}
          </Stack>

          <Stack direction="row">
            {!editing && <Typography>processing time:</Typography>}
            {editing ? (
              <TextField
                onChange={(e) => {
                  editedprocessor["processing time"] = new Array(
                    (24 * 60) / timestep
                  ).fill(Number(e.target.value));
                }}
                size="small"
                label="processing time"
                defaultValue={formatvalue(processor["processing time"])}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            ) : (
              <Typography>
                {formatvalue(processor["processing time"])}
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
                defaultValue={formatvalue(processor["processor number"])}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            ) : (
              <Typography>
                {formatvalue(processor["processor number"])}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
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

const formatvalue = (val) => {
  if (Array.isArray(val)) {
    return val.reduce((a, b) => a + b, 0) / val.length;
  } else {
    return String(val);
  }
};

const deleteprocessor = (data, dispatch, keyprocessor) => {
  delete data.terminal[keyprocessor];
  dispatch({ type: "setTerminal", newterminal: data.terminal });
};

const saveprocessor = (data, dispatch, editedprocessor, keyprocessor) => {
  data.terminal[keyprocessor] = editedprocessor;
  dispatch({ type: "setTerminal", newterminal: data.terminal });
};
