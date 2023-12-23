import { createContext, useReducer } from "react";

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

    case "setColumnsVis":
      return { ...data, columnsvis: action.newcolumnsvis };

    case "setRows":
      // updated schedule
      return { ...data, rows: action.newrows };

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
  ["columnsvis", {}],
  ["rows", null],
  ["file", null],
  ["snackbar", null],
]);
