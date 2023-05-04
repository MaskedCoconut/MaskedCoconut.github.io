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
    case "setFile":
      return { ...data, file: action.file };

    case "setSnackbar":
      return { ...data, snackbar: action.snackbar };

    case "setRows":
      return { ...data, rows: action.newrows };

    case "setIsValidated":
      return { ...data, isvalidated: action.isvalidated };

    case "setMatch":
      if (action.match == "reinit") {
        return { ...data, match: initialAppData.match };
      } else {
        return { ...data, match: action.match };
      }

    case "setShowup":
      // updated showup parameters
      const newdata = { ...data, showup: action.newshowup };

      // refresh showUp graphs
      const [newsimresult, newprofiledata] = calculateShowUp(newdata);

      return {
        ...newdata,
        profiledata: newprofiledata,
        simresult: newsimresult,
      };

    case "setProfiledata":
      return { ...data, profiledata: action.newprofiledata };

    case "setSimresult":
      return { ...data, simresult: action.newsimresult };

    case "setTerminal":
      // updated terminal parameters
      const newnewdata = { ...data, terminal: action.newterminal };

      // refresh simulation
      const newchartdata = runSecurity(newnewdata);
      return { ...newnewdata, simresult: newchartdata };

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
  ["rows", null],
  ["cols", null],
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
  [
    "terminal",
    {
      security: {
        isFirstStep: true,
        "previous step": null,
        "processing time": new Array((24 * 60) / timestep).fill(12),
        "processor number": new Array((24 * 60) / timestep).fill(15),
      },
    },
  ],
]);
