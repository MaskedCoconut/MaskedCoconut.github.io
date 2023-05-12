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

const halltypes = processortypes
  .filter((obj) => obj.type == "hall")
  .map((obj) => obj.name);

// recalculate all processors queues and output successively
export const runSecurity = (data) => {
  // change this to first line return
  if (data?.simresult?.showup && data.terminal) {
    const alreadyUpdatedFacilities = ["showup"];
    let toUpdateFacilities = [];
    let remainsChildren = true;

    while (remainsChildren) {
      // loop through current Facilites
      for (const currentFacility of alreadyUpdatedFacilities) {
        const children = Object.keys(data.terminal).filter((key) =>
          data.terminal[key]["previous steps"].includes(currentFacility)
        );

        toUpdateFacilities = toUpdateFacilities.concat(children);

        if (toUpdateFacilities.length == 0) {
          remainsChildren = false;
          break;
        }

        // loop through children
        children
          // only update children who have all parents updated already
          .filter((child) =>
            data.terminal[child]["previous steps"].every((facility) =>
              alreadyUpdatedFacilities.includes(facility)
            )
          )
          .forEach((child) => {
            const isHall = halltypes.includes(data.terminal[child].type);

            // showup considering routes
            const showuparray = (() => {
              // loop through parents
              const arrayofshowuparrays = data.terminal[child][
                "previous steps"
              ].map((parent) => {
                // get showup*ratio is 100 if no route exists
                const ratio =
                  data.routes.filter(
                    (route) => route.parent == parent && route.child == child
                  )?.[0]?.ratio ?? 100;
                if (parent == "showup") {
                  return data.simresult.showup
                    .map((obj) => obj["Show-up [Pax/h]"])
                    .map((x) => (x * ratio) / 100);
                } else {
                  return data.simresult[parent]
                    .map((obj) => obj["Output [Pax/h]"])
                    .map((x) => (x * ratio) / 100);
                }
              });

              return arrayofshowuparrays[0].map((_slot, id) =>
                arrayofshowuparrays
                  .map((showuparray) => showuparray[id])
                  .reduce((total, item) => total + item)
              );
            })();

            const queue = new Array((24 * 60) / timestep).fill(0);
            const output = new Array((24 * 60) / timestep).fill(0);
            const wait = new Array((24 * 60) / timestep).fill(0);

            // calculate throughput5min
            let throughput5min;
            if (isHall) {
              // if step is hall, calculate from dwell time
              throughput5min = queue.map((_val, id) => {
                const dwell_offset =
                  Math.floor(data.terminal[child]["dwell time [m]"][id] / 5) +
                  1;

                return (
                  (showuparray[
                    id - dwell_offset < 0
                      ? showuparray.length + (id - dwell_offset)
                      : id - dwell_offset
                  ] *
                    timestep) /
                  60
                );
              });
            } else {
              // if step is processor, calculate from proc. time and number
              throughput5min = queue.map(
                (_x, id) =>
                  (data.terminal[child]["processor number"][id] *
                    timestep *
                    60) /
                  data.terminal[child]["processing time [s]"][id]
              );
            }

            // net Pax added to queue (when >0) or capacity left (when <0)
            const net_diff = queue.map(
              (_val, id) =>
                (showuparray[id] * timestep) / 60 - throughput5min[id]
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
            if (isHall) {
              throughput5min.forEach((val, id) => {
                output[id] = (throughput5min[id] * 60) / timestep;
              });
            } else {
              net_diff.forEach((val, id) => {
                output[id] =
                  val <= 0 && queue[id] == 0
                    ? showuparray[id]
                    : data.terminal[child]["processor number"][id] /
                      (data.terminal[child]["processing time [s]"][id] / 3600);
              });
            }

            // calculate queue duration
            if (!isHall) {
              wait.map((_val, id) => {
                let pax = queue[id];
                while (true) {
                  if (pax > 0) {
                    pax -= throughput5min[id + 1];
                    if (pax > 0) {
                      wait[id] += timestep;
                    } else {
                      wait[id] +=
                        timestep *
                        ((pax + throughput5min[id + 1]) /
                          throughput5min[id + 1]);
                      break;
                    }
                  } else {
                    break;
                  }
                }
              });
            }

            const newsimresultsecurity = data.simresult.showup.map(
              (_row, id) => {
                return Object.fromEntries([
                  ["slot", data.simresult.showup[id]["slot"]],
                  ["Show-up [Pax/h]", showuparray[id]],
                  ["Output [Pax/h]", output[id]],
                  ["Queue [Pax]", queue[id]],
                  [
                    "Queue [min]",
                    isHall
                      ? data.terminal[child]["dwell time [m]"][id]
                      : wait[id],
                  ],
                  ["LoS", calculateLoS(queue[id], wait[id], child, data)],
                ]);
              }
            );

            data.simresult[child] = newsimresultsecurity;
            alreadyUpdatedFacilities.push(child);
            toUpdateFacilities = toUpdateFacilities.filter(
              (val) => val != child
            );
          });
      }
    }
  }
  return { ...data.simresult };
};

// LoS calculation
const calculateLoS = (queuePax, queueMinutes, facility, data) => {
  // IATA optimum recomendations example for security
  const areaSqm = data.terminal[facility]["area [sqm]"];
  const isHall = halltypes.includes(data.terminal[facility].type);
  const processortype = processortypes.filter(
    (type) => type.name == data.terminal[facility].type
  )[0];
  const sqmPaxlow = processortype.sqmPaxlow;
  const sqmPaxhigh = processortype.sqmPaxhigh;
  const waitLow = processortype.waitLow;
  const waitHigh = processortype.waitHigh;
  const sqmPax = areaSqm / queuePax;

  // wait criteria
  const waitLOS =
    queueMinutes < waitLow
      ? "Over-Design"
      : queueMinutes > waitHigh
      ? "Sub-Optimal"
      : "Optimal";

  // space criteria
  const spaceLOS =
    sqmPax < sqmPaxlow
      ? "Sub-Optimal"
      : sqmPax > sqmPaxhigh
      ? "Over-Design"
      : "Optimal";

  // final LoS
  let LoS;
  if (isHall) {
    LoS = sqmPax <= 0.8 * sqmPaxlow ? "Under-Provided" : spaceLOS;
  } else {
    if (waitLOS == "Over-Design" && spaceLOS == "Over-Design") {
      LoS = "Over-Design";
    } else if (waitLOS == "Sub-Optimal" && spaceLOS == "Sub-Optimal") {
      LoS = "Under-Provided";
    } else if (waitLOS == "Sub-Optimal" || spaceLOS == "Sub-Optimal") {
      LoS = "Sub-Optimal";
    } else {
      LoS = "Optimal";
    }
  }
  return LoS;
};

// calculate Showup Profile
export const calculateProfile = (data) => {
  // case default or normal distribution
  var usedShowUpProfile = [];
  switch (data.showup.type) {
    case "default":
      usedShowUpProfile = generateNormShowupProfile(120, 20);

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
    (_val, idx) =>
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
