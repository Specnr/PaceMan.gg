export const msToTime = (ms: number, keepMs=false): string => {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds = Math.floor((ms / 1000) % 60),
    minutes = Math.floor((ms / (1000 * 60)) % 60);

  if (milliseconds >= 5) {
    seconds = (seconds + 1) % 60;
    if (seconds === 0) {
      minutes = (minutes + 1);
    }
  }

  const minutesStr = (minutes < 10) ? "0" + minutes : minutes;
  const secondsStr = (seconds < 10) ? "0" + seconds : seconds;

  let ret =  minutesStr + ":" + secondsStr;
  if (keepMs) {
    ret += "." + milliseconds;
  }
  return ret;
};

export const msToDate = (ms: number) => (new Date(ms * 1000)).toLocaleDateString("en-us")

export const uuidToHead = (uuid: string): string => {
  const endpoint = "https://mc-heads.net/avatar/";
  return `${endpoint}${uuid}.png`
};

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export const ordinalSuffix = (i: number): string => {
  const j = i % 10, k = i % 100
  if (j === 1 && k !== 11)
      return i + "st"
  if (j === 2 && k !== 12)
      return i + "nd"
  if (j === 3 && k !== 13)
      return i + "rd"
  return i + "th"
}

export const placeToColor = (place: number) => {
  if (place === 1)
    return "goldenrod"
  if (place === 2)
    return "#929292"
  if (place === 3)
    return "#cd7f32"
}