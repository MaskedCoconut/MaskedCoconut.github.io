import { createContext, useReducer } from "react";
import selectList from "../../pages/index";
import { ALLOWEDEXTENSIONS, SELECTLIST } from "../settings";

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
    case "ParsedCsvData": {
      // take the ParsedData, add id and store them
      const rows = action.parsedData.map((row, idx) =>
        Object.assign({ id: idx }, row)
      );
      const cols = [{ field: "id", headerName: "ID", width: 90 }].concat(
        Object.keys(action.parsedData[0]).map((col) =>
          Object.fromEntries([
            ["field", col],
            ["headerName", col],
            ["width", 150],
            ["editable", true],
          ])
        )
      );

      return Object.fromEntries([
        ["rows", rows],
        ["cols", cols],
        ["match", data.match],
      ]);
    }

    case "UpdateRow": {
      const newRows = { ...action.newrow };
      return Object.fromEntries([
        ["rows", newRows],
        ["cols", data.cols],
        ["match", data.match],
      ]);
    }

    case "UpdateMatch":
      debugger;
      return Object.fromEntries([
        ["rows", data.rows],
        ["cols", data.cols],
        ["match", action.match],
      ]);

    case "UpdateCols": {
      // look at each colDataGrid, if headerName is matched (= in the values of match), change the headerName to the corresponding key in match
      const matchedHeaderName = Object.values(data.match);

      const updatedColDatagrid = data.cols
        // filter to not recreate "error" column
        .filter((col) => col.field != "error")
        .map((col) =>
          matchedHeaderName.includes(col["headerName"]) &&
          col["headerName"] != ""
            ? Object.fromEntries([
                ["field", col["field"]],
                ["headerName", ...getKeyByValue(data.match, col["headerName"])],
                ["width", 150],
                ["editable", true],
              ])
            : col
        );
      const updatedColDatagridAndError = updatedColDatagrid.concat(
        Object.fromEntries([
          ["field", "error"],
          ["headerName", "error"],
          ["width", 150],
          ["editable", false],
          ["valueGetter", (params) => getRowError(params, data.match)],
        ])
      );

      return Object.fromEntries([
        ["rows", data.rows],
        ["cols", updatedColDatagridAndError],
        ["match", data.match],
      ]);
    }
    default: {
      console.log("bamboozled");
      debugger;
    }
  }
}

const initialAppData = Object.fromEntries([
  ["rows", null],
  ["cols", null],
  ["match", Object.fromEntries(SELECTLIST.map((col) => [col, ""]))],
]);

// Get keys (array) by value
const getKeyByValue = (object, value) => {
  return Object.keys(object).filter((key) => object[key] === value);
};

// Returns filtered object keeping only keys matching value
// Assign "" to all values if isReinit = true
const FilterObjectOnValue = (obj, val, isReinit) => {
  const asArray = Object.entries(obj);
  const filteredArray = asArray.filter(([key, value]) => value === val);
  const filteredObject = Object.fromEntries(filteredArray);
  const result = Object.fromEntries(
    Object.keys(filteredObject).map((key) => [key, isReinit ? "" : obj.key])
  );
  return result;
};

const getRowError = (params, match) => {
  let result = [1];
  // take only the matched columns
  Object.keys(match)
    .filter((key) => match[key])
    .forEach((headerName) => {
      switch (headerName) {
        case "Flight Date":
          result.push(Date.parse(params.row[match[headerName]]) ? 1 : 0);
          debugger;
          break;
        case "Arr./Dep.":
          result.push(
            ["A", "D"].includes(params.row[match[headerName]]) ? 1 : 0
          );
          debugger;
          break;
      }
    });
  debugger;
  return result.reduce((a, b) => a * b, 1);
};
