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

export const uuidToHead = (uuid: string): string => {
  const endpoint = "https://mc-heads.net/avatar/";
  return `${endpoint}${uuid}.png`
};