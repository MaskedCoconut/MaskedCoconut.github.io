import { erf } from "mathjs";
import {
  SELECTLIST,
  defaultShowUpProfile,
  timestep,
  processortypes,
} from "./settings";

// Get keys (array) by value
export const getKeyByValue = (object, value) => {
  return Object.keys(object).filter((key) => object[key] === value);
};

// Returns filtered object keeping only keys matching value
// Assign "" to all values if isReinit = true
export const FilterObjectOnValue = (obj, val, isReinit) => {
  const asArray = Object.entries(obj);
  const filteredArray = asArray.filter(([, value]) => value === val);
  const filteredObject = Object.fromEntries(filteredArray);
  const result = Object.fromEntries(
    Object.keys(filteredObject).map((key) => [key, isReinit ? "" : obj.key])
  );
  return result;
};

// Errors for conditional formatting of schedule
export const getRowError = (row) => {
  const result = [1];
  const errors = [];
  const colFieldList = Object.keys(row);

  SELECTLIST.filter((field) => colFieldList.includes(field)).forEach(
    (field) => {
      switch (field) {
        case "Flight Date":
          if (Date.parse(row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Flight Date");
          }
          break;
        case "Scheduled Time":
          const originTime = "2022-10-13 ";
          if (Date.parse([originTime, row[field]].join(" "))) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Scheduled Time");
          }
          break;
        case "Arr./Dep.":
          if (["A", "D"].includes(row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Arr./Dep.");
          }
          break;
        case "Pax":
          if (!isNaN(row[field])) {
            result.push(1);
          } else {
            result.push(0);
            errors.push("Pax");
          }
          break;
      }
    }
  );
  return result.reduce((a, b) => a * b, 1) == 1
    ? "valid row"
    : errors.join("|");
};

// recalculate all processors queues and output successively
export const runSecurity = (data) => {
  if (data?.simresult?.showup && data.terminal) {
    const numberofprocessor = Object.keys(data.terminal).length;
    let previousstep = "showup";

    for (let step = 0; step < numberofprocessor; step++) {
      // how to go through the processes in correct order?
      const currentstep = Object.keys(data.terminal).filter(
        (key) => data.terminal[key]["previous step"] == previousstep
      )[0];

      if (!currentstep) {
        break;
      }

      const halltypes = processortypes
        .filter((obj) => obj.type == "hall")
        .map((obj) => obj.name);

      const queue = new Array((24 * 60) / timestep).fill(0);
      const output = new Array((24 * 60) / timestep).fill(0);
      const wait = new Array((24 * 60) / timestep).fill(0);

      if (halltypes.includes(data.terminal[currentstep].type)) {
        const dwell_offset =
          Math.floor(data.terminal[currentstep]["dwell time [m]"] / 5) + 1;
        const throughput5min = queue.map(
          (id) =>
            (data.terminal[currentstep]["processor number"][id] *
              timestep *
              60) /
            data.terminal[currentstep]["processing time [s]"][id]
        );
        break;
      }

      const throughput5min = queue.map(
        (id) =>
          (data.terminal[currentstep]["processor number"][id] * timestep * 60) /
          data.terminal[currentstep]["processing time [s]"][id]
      );

      const showuparray =
        previousstep == "showup"
          ? data.simresult.showup.map((obj) => obj["Show-up [Pax/h]"])
          : data.simresult[previousstep].map((obj) => obj["Output [Pax/h]"]);

      // net Pax added to queue (when >0) or capacity left (when <0)
      const net_diff = queue.map(
        (val, id) => (showuparray[id] * timestep) / 60 - throughput5min[id]
      );

      // cumsum of previous without negative queue
      net_diff.forEach((val, id) => {
        if (id > 0) {
          if (queue[id - 1] + val > 0) {
            queue[id] = queue[id - 1] + val;
          } else {
            queue[id] = 0;
          }
        } else {
          if (net_diff > 0) {
            queue[id] = val;
          }
        }
      });

      // calculate output
      net_diff.forEach((val, id) => {
        output[id] =
          val <= 0 && queue[id] == 0
            ? showuparray[id]
            : data.terminal[currentstep]["processor number"][id] /
              (data.terminal[currentstep]["processing time [s]"][id] / 3600);
      });

      // calculate queue duration
      wait.map((val, id) => {
        let pax = queue[id];
        while (true) {
          if (pax > 0) {
            pax -= throughput5min[id + 1];
            if (pax > 0) {
              wait[id] += timestep;
            } else {
              wait[id] +=
                timestep *
                ((pax + throughput5min[id + 1]) / throughput5min[id + 1]);
              break;
            }
          } else {
            break;
          }
        }
      });

      const newsimresultsecurity = data.simresult.showup.map((row, id) => {
        return Object.fromEntries([
          ["slot", data.simresult.showup[id]["slot"]],
          ["Show-up [Pax/h]", showuparray[id]],
          ["Output [Pax/h]", output[id]],
          ["Queue [Pax]", queue[id]],
          ["Queue [min]", wait[id]],
        ]);
      });

      data.simresult[currentstep] = newsimresultsecurity;
      previousstep = currentstep;
    }

    return { ...data.simresult };
  }
};

// calculate Showup Profile
export const calculateProfile = (data) => {
  // case default or normal distribution
  var usedShowUpProfile = [];
  switch (data.showup.type) {
    case "default":
      usedShowUpProfile = defaultShowUpProfile;
      break;

    case "normdist":
      usedShowUpProfile = generateNormShowupProfile(
        data.showup.mean,
        data.showup.stdev
      );
      break;
  }

  // format object for plot and state management
  const profiledata = usedShowUpProfile.map((val, id) =>
    Object.fromEntries([
      ["slot", timeFromatter(id)],
      ["Show-up Profile", val],
    ])
  );

  return profiledata;
};

// calculate the show-up and profile
export const calculateShowUp = (data) => {
  if (data.rows) {
    // calculate the show-up
    const showuparray = Array((24 * 60) / timestep).fill(0);
    data.rows
      .filter((row) => row.Pax)
      .map((row) => {
        const originTime = "2022-10-13 ";
        const date = new Date([originTime, row["Scheduled Time"]].join(" "));
        const std5Minutes = Math.floor(
          (date.getMinutes() + date.getHours() * 60) / timestep
        );

        const profileArray = data.profiledata.map(
          (obj) => obj["Show-up Profile"]
        );

        profileArray.forEach((sup, idx) => {
          const destIndex = (std5Minutes - idx) % ((24 * 60) / timestep);
          showuparray[
            destIndex < 0 ? showuparray.length + destIndex : destIndex
          ] += sup * row.Pax;
        });
      });

    // format object for plot and state management
    const showupdata = showuparray.map((val, id) =>
      Object.fromEntries([
        ["slot", timeFromatter(id)],
        ["Show-up [Pax/h]", (val * 60) / timestep],
      ])
    );

    // return result
    return showupdata;
  }
};

export function generateNormShowupProfile(mean, stdev) {
  const startArray = new Array((5 * 60) / timestep).fill(0);
  return startArray.map(
    (val, idx) =>
      cdfNormal(idx * timestep, mean, stdev) -
      cdfNormal((idx - 1) * timestep, mean, stdev)
  );
}

export const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(Math.round(number)).toString()}`;

export const percentageFormatter = (number) => `${(number * 100).toFixed(2)}%`;

export const timeFromatter = (slot5m) => {
  const h = Math.floor((slot5m * timestep) / 60);
  const m = (slot5m * timestep) % 60;
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
};

export function cdfNormal(x, mean, standardDeviation) {
  return (1 - erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
}

export const exportData = (data) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "ADRM-save.json";
  link.click();
};

export const importData = (e, data, dispatch) => {
  if (e.target.files.length) {
    const inputFile = e.target.files[0];
    const fileExtension = inputFile?.type.split("/")[1];

    if (!["json"].includes(fileExtension)) {
      dispatch({
        type: "setSnackbar",
        snackbar: { children: "Only .json are accepted", severity: "error" },
      });
    } else {
      const reader = new FileReader();
      reader.readAsText(inputFile);
      reader.onload = ({ target }) => {
        const parsedData = JSON.parse(target.result);
        dispatch({
          type: "setSnackbar",
          snackbar: { children: "data loaded from file", severity: "success" },
        });

        data = structuredClone(parsedData);
        dispatch({ type: "setRows", newrows: data.rows });
        // Why do I need that?
        dispatch({ type: "setTerminal", newterminal: parsedData.terminal });
      };
    }
  }
};
