import { Chip, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Papa from "papaparse";
import { useContext } from "react";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "../context/AppDataContext";

import * as Constants from "../settings";

const UploadStack = () => {
  // AppDataContext
  const dispatch = useContext(AppDataDispatchContext);
  const data = useContext(AppDataContext);

  // File input change
  const handleFileChange = (event) => {
    if (event.target.files.length) {
      const inputFile = event.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!Constants.ALLOWEDEXTENSIONS.includes(fileExtension)) {
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "Only .csv are accepted", severity: "error" },
        });
      } else {
        dispatch({ type: "setFile", file: inputFile });
        dispatch({
          type: "setSnackbar",
          snackbar: { children: ".csv file found", severity: "success" },
        });
      }
    }
  };

  // Parse and update data
  const handleLoad = () => {
    if (!data.file) {
      dispatch({
        type: "setSnackbar",
        snackbar: { children: "select a csv file first", severity: "error" },
      });
    } else {
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const rows = parsedData.map((row, idx) =>
          Object.assign({ id: idx }, row)
        );
        const cols = [{ field: "id", headerName: "ID", width: 90 }].concat(
          Object.keys(parsedData[0]).map((col) =>
            Object.fromEntries([
              ["field", col],
              ["headerName", col],
              ["width", 150],
              ["editable", true],
            ])
          )
        );
        dispatch({ type: "setCols", newcols: cols });
        dispatch({ type: "setRows", newrows: rows });
      };
      reader.readAsText(data.file);
      dispatch({ type: "setMatch", match: "reinit" });
      dispatch({
        type: "setSnackbar",
        snackbar: { children: "data loaded from file", severity: "success" },
      });
    }
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      <div>
        <Stack direction="row" spacing={0.1}>
          <Button variant="contained" component="label">
            Select .csv
            <input
              onChange={handleFileChange}
              id="csvInput"
              hidden
              type="File"
            />
          </Button>
          {data.file && (
            <Chip size="small" label={data.file && `${data.file.name}`} />
          )}
        </Stack>
      </div>
      <Button variant="contained" component="label" onClick={handleLoad}>
        Load .csv
      </Button>
      {data.isvalidated && (
        <Link href="/showup">
          <Button variant="contained" component="label">
            To showup
          </Button>
        </Link>
      )}
    </Stack>
  );
};

export default UploadStack;
