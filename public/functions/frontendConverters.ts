import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const msToTime = (ms: number, keepMs = false): string => {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60);

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;

  let ret = minutesStr + ":" + secondsStr;
  if (keepMs) {
    ret += "." + milliseconds;
  }
  return ret;
};

export const msToDate = (ms: number) => dayjs(ms * 1000).format("MM/DD/YYYY");

export const NETHER_ICON = "../images/nether.png"
export const FORTRESS_ICON = "../images/fortress.png"
export const BASTION_ICON = "../images/bastion.png"
export const PORTAL_ICON = "../images/portal.png"
export const STRONGHOLD_ICON = "../images/sh.png"
export const END_ICON = "../images/end.png"
export const CREDITS_ICON = "../images/credits.png"

export const splitToIcon = (splitId: number) => {
  switch (splitId) {
    case 0:
      return NETHER_ICON;
    case 1:
      return BASTION_ICON;
    case 2:
      return FORTRESS_ICON;
    case 3:
      return PORTAL_ICON;
    case 4:
      return PORTAL_ICON;
    case 5:
      return STRONGHOLD_ICON;
    case 6:
      return END_ICON;
    case 7:
      return CREDITS_ICON;
    default:
      return NETHER_ICON;
  }
};

export const uuidToHead = (uuid: string): string => {
  const endpoint = "https://api.mineatar.io/face/";
  return `${endpoint}${uuid}`;
};

export const uuidToSkin = (uuid: string): string => {
  const endpoint = "https://mc-heads.net/body/";
  return `${endpoint}${uuid}`;
};

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export const ordinalSuffix = (i: number): string => {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) return i + "st";
  if (j === 2 && k !== 12) return i + "nd";
  if (j === 3 && k !== 13) return i + "rd";
  return i + "th";
};

export const placeToColor = (place: number) => {
  if (place === 1) return "goldenrod";
  if (place === 2) return "#929292";
  if (place === 3) return "#cd7f32";
};

export const EVENT_ID_NAME = [
  "Enter Nether",
  "Enter Bastion",
  "Enter Fortress",
  "First Portal",
  "Second Portal",
  "Enter Stronghold",
  "Enter End",
  "Finish",
];

export const lastUpdatedDifference = (
  lastUpdated: number,
  latestSplit: number
) => {
  const now = dayjs().tz("America/Toronto").valueOf();
  return msToTime(latestSplit + now - lastUpdated);
};

export const createDateFromInput = (date: dayjs.Dayjs) => {
  date = date ?? dayjs();

  const [d, m, y] = [date.get("date"), date.get("month"), date.get("year")];

  const newDate = date.tz("America/Toronto");
  newDate.set("date", d);
  newDate.set("month", m);
  newDate.set("year", y);

  return newDate.valueOf();
};
