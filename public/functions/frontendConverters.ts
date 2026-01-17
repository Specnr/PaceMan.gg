import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const timeToMs = (time: string) => {
  if (time === "Error" || time === "N/A") {
    return Number.MAX_SAFE_INTEGER;
  }
  const [minutes, seconds] = time.split(":").map(Number);
  return (minutes * 60) + seconds;
};

export const msToTime = (ms: number, keepMs = false): string => {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60),
    hours = Math.floor((ms / (1000 * 60 * 60)) % 60);

  const hoursStr = hours < 10 ? "0" + hours : hours;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;

  let ret = minutesStr + ":" + secondsStr;
  if (keepMs) {
    ret += "." + milliseconds;
  }

  if (hours > 0) {
    ret = `${hoursStr}:${ret}`
  }

  return ret;
};

export const msToDate = (ms: number) => dayjs(ms * 1000).format("L");


export const dateToTimeFormat = (ms: number) => {
  return dayjs(ms * 1000).format("L LT");
};

export const NETHER_ICON = "nether"
export const FORTRESS_ICON = "fortress"
export const BASTION_ICON = "bastion"
export const PORTAL_ICON = "portal"
export const STRONGHOLD_ICON = "sh"
export const END_ICON = "end"
export const CREDITS_ICON = "credits"

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
  return "#d1d5db";
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

// Note: This function intentionally creates different content between server and client renders OCCATIONALLY.
// It will cause a harmless hydration mismatch warning that can be ignored.
export const getSemiRandomLoadingMessage = () => {
  const timeIdx = Math.floor(Date.now() / 1000);

  const messages = [
    "Hitting a Pound-portal",
    "Performing a one-shot",
    "Changing the world",
    "Hitting the zero",
    "Getting caved",
    "Resetting the world",
    "Digging on 8 9",
    "Pearling into lava",
    "Hitting the crystal",
    "Resetting a fastion",
    "Hitting save & quit",
    "Blinding at 150 150",
    "Forgetting fire-res",
    "Going 0/10 in Ranked",
    "Buying a 5950x",
    "Buying a 5090",
    "Preparing a godseed",
    "Getting treasure'd",
    "Crafting 6 shears",
    "Crafting 24 buttons",
    "Crafting an iron hoe",
    "Playing stronghold-first",
    "Playing monument",
    "Playing classic",
    "Pacebaiting",
  ];

  return messages[timeIdx % messages.length] + "...";
};

export const gameVersions = [
  "All",
  "1.16.1",
  "1.15.2",
  "1.7.10",
  "1.8.9",
  "1.14.4",
  "1.12.2",
  "1.16.5",
  "1.17.1",
  "1.8",
  "1.12",
  "1.3.1",
  "1.4.2",
  "1.4.7",
  "1.5.2",
  "1.6.4",
  "1.7.2",
  "1.7.4",
  "1.9.4",
  "1.10.2",
  "1.11.2",
  "1.18.1",
  "1.18.2",
  "1.19.2",
  "1.19.4",
  "1.20.4",
  "1.20.6",
  "1.21",
  "1.13.2"
]
