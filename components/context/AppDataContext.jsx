import { createContext, useReducer } from "react";
import { SELECTLIST } from "../settings";
import { calculateShowUp, runSecurity } from "../utils";
import { timestep } from "../settings";

export const AppDataContext = createContext(null);
export const AppDataDispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const [AppData, AppDataDispatch] = useReducer(appDataReducer, initialAppData);

  return (
    <AppDataContext.Provider value={AppData}>
      <AppDataDispatchContext.Provider value={AppDataDispatch}>
        {children}
      </AppDataDispatchContext.Provider>
    </AppDataContext.Provider>
  );
};

export default AppProvider;

function appDataReducer(data, action) {
  switch (action.type) {
    case "setCurrenttab":
      // Only updates current tab
      return { ...data, currenttab: action.newtab };

    case "setFile":
      // Only updates file ref
      return { ...data, file: action.file };

    case "setSnackbar":
      // Only update the snackbar
      return { ...data, snackbar: action.snackbar };

    case "setIsValidated":
      // Only update the validation status of schedule columns
      return { ...data, isvalidated: action.isvalidated };

    case "setMatch":
      // Only updated the match object
      if (action.match == "reinit") {
        return { ...data, match: initialAppData.match };
      } else {
        return { ...data, match: action.match };
      }

    case "setRows":
      // updated schedule
      const newdataRows = { ...data, rows: action.newrows };

      // refresh showUp graphs
      const [newshowupdataRows, newprofiledataRows] =
        calculateShowUp(newdataRows);

      // merge into a updated object
      const newdataRowsAndShowup = {
        ...newdataRows,
        profiledata: newprofiledataRows,
        simresult: { ...data.simresult, showup: newshowupdataRows },
      };

      // refresh simulation
      const newchartdataRows = runSecurity(newdataRowsAndShowup);

      // return updated object
      return { ...newdataRowsAndShowup, simresult: newchartdataRows };

    case "setShowup":
      // updated showup parameters
      const newdataShowup = { ...data, showup: action.newshowup };

      // refresh showUp graphs
      const [newsimresultShowup, newprofiledataShowup] =
        calculateShowUp(newdataShowup);

      const newdataShowupAndShowup = {
        ...newdataShowup,
        profiledata: newprofiledataShowup,
        simresult: { ...data.simresult, showup: newsimresultShowup },
      };

      // refresh simulation
      const newchartdataShowup = runSecurity(newdataShowupAndShowup);

      // return updated object
      return { ...newdataShowupAndShowup, simresult: newchartdataShowup };

    case "setTerminal":
      // updated terminal parameters
      const newdataTerminal = { ...data, terminal: action.newterminal };

      // refresh simulation
      const newchartdataTerminal = runSecurity(newdataTerminal);
      return { ...newdataTerminal, simresult: newchartdataTerminal };

    default: {
      return {
        ...data,
        snackbar: {
          children: "unknow action - please report bug!",
          severity: "error",
        },
      };
    }
  }
}

const initialAppData = Object.fromEntries([
  ["currenttab", 0],
  ["rows", null],
  ["match", Object.fromEntries(SELECTLIST.map((col) => [col, ""]))],
  ["file", null],
  ["snackbar", null],
  ["isvalidated", false],
  [
    "showup",
    Object.fromEntries([
      ["type", "default"],
      ["mean", 60],
      ["stdev", 30],
    ]),
  ],
  ["profiledata", null],
  ["simresult", null],
  ["terminal", {}],
]);
