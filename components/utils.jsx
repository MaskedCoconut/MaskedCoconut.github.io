import { defaultShowUpProfile, timestep } from "./settings";
import { erf } from "mathjs";
import {
  AppDataContext,
  AppDataDispatchContext,
} from "./context/AppDataContext";

// recalculate security queue
export const runSecurity = (data, dispatch) => {
  if (data.simresult) {
    const empty = new Array((24 * 60) / timestep).fill(0);

    // net Pax added to queue (when >0) or capacity left (when <0)
    const net_diff = empty.map(
      (val, id) =>
        data.simresult[id]["Pax/h"] -
        (data.terminal.security["processor number"] * timestep * 60) /
          data.terminal.security["processing time"]
    );

    // cumsum of previous
    net_diff.forEach((val, id) => {
      if (id > 0) {
        if (empty[id - 1] + net_diff[id] > 0) {
          empty[id] = empty[id - 1] + net_diff[id];
        } else {
          empty[id] = 0;
        }
      } else {
        if (net_diff > 0) {
          empty[id] = net_diff[id];
        }
      }
    });

    const newchartdata = data.simresult.map((row, id) => {
      return { ...row, ...{ "Security queue": empty[id] } };
    });

    dispatch({ type: "setSimresult", newsimresult: newchartdata });
  }
};

// recalculate and update the show-up and profile
export const calculateShowUp = (data, dispatch) => {
  if (data.rows) {
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
    }

    const showuparray = skdToShowUp(data.rows, usedShowUpProfile);
    const chartdata = showuparray.map((val, id) =>
      Object.fromEntries([
        ["slot", timeFromatter(id)],
        ["Pax/h", val],
      ])
    );
    const profiledata = usedShowUpProfile.map((val, id) =>
      Object.fromEntries([
        ["slot", timeFromatter(id)],
        ["Pax/h", val],
      ])
    );
    dispatch({ type: "setSimresult", newsimresult: chartdata });
    dispatch({ type: "setProfiledata", newprofiledata: profiledata });
  }
};

export const skdToShowUp = (data, showUpProfile) => {
  // for each flight
  const result = Array((24 * 60) / timestep).fill(0);

  data
    .filter((row) => row.Pax)
    .map((row) => {
      const originTime = "2022-10-13 ";
      const date = new Date([originTime, row["Scheduled Time"]].join(" "));
      const std5Minutes = Math.floor(
        (date.getMinutes() + date.getHours() * 60) / timestep
      );

      showUpProfile.forEach((sup, idx) => {
        const destIndex = (std5Minutes - idx) % ((24 * 60) / timestep);
        result[destIndex < 0 ? result.length + destIndex : destIndex] +=
          sup * row.Pax;
      });
    });
  return result;
};

export const dataFormatter = (number) =>
  `${Intl.NumberFormat("us")
    .format(Math.round(number * 12))
    .toString()}`;

export const percentageFormatter = (number) => `${(number * 100).toFixed(2)}%`;

export const timeFromatter = (slot5m) => {
  const h = Math.floor((slot5m * timestep) / 60);
  const m = (slot5m * timestep) % 60;
  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
};

export function cdfNormal(x, mean, standardDeviation) {
  return (1 - erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
}

export function generateNormShowupProfile(mean, stdev) {
  const startArray = new Array((5 * 60) / timestep).fill(0);
  return startArray.map(
    (val, idx) =>
      cdfNormal(idx * timestep, mean, stdev) -
      cdfNormal((idx - 1) * timestep, mean, stdev)
  );
}
