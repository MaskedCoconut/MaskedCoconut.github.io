import { createContext, useReducer } from "react";
import { SELECTLIST } from "../settings";

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
    case "setRows":
      return { ...data, rows: action.newrows };

    case "setCols":
      return { ...data, cols: action.newcols };

    case "setFile":
      return { ...data, file: action.file };

    case "setSnackbar":
      return { ...data, snackbar: action.snackbar };

    case "setIsValidated":
      return { ...data, isvalidated: action.isvalidated };

    case "setMatch":
      if (action.match == "reinit") {
        return { ...data, match: initialAppData.match };
      } else {
        return { ...data, match: action.match };
      }

    case "setShowup":
      if (action.newshowup == "reinit") {
        return { ...data, showup: initialAppData.showup };
      } else {
        return { ...data, showup: action.newshowup };
      }

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
]);
