import Pace from "@/components/interfaces/Pace";

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

const INVALID_MODS = new Set([
  "123",
  "456",
  "789"
]);

export const apiToPace = (runs: any[]): Pace[] => {
  const paces: Pace[] = [];
  runs.forEach(run => {
    // Ensure run and record exist
    if (!run || !run.record) {
      return;
    }
    const record = run.record;

    // Ensure correct version (can split in future)
    if (!record.mc_version || record.mc_version !== "1.16.1") {
      return;
    }

    // Ensure correct category (can split in future)
    if (!record.category || record.category != "ANY" || !record.run_type || record.run_type !== "random_seed") {
      return;
    }

    // Ensure valid modlist
    if (!run.modlist) {
      return;
    }
    let validMods = true;
    run.modlist.forEach((mod: string) => {
      if (validMods && INVALID_MODS.has(mod)) {
        validMods = false;
      }
    })
    if (!validMods) {
      return;
    }

    // Ensure valid metadata
    if (!record.timelines || !run.nicknames || !run.uuids || !run.twitch || !run.alt) {
      return;
    }

    // Ensure there are enough things to show
    if (record.timelines.length === 0 || run.nicknames.length === 0 || run.uuids.length === 0 || run.twitch.length === 0 || run.alt.length === 0) {
      return;
    }

    paces.push({
      nickname: run.nicknames[0],
      uuid: run.uuids[0],
      twitch: run.twitch[0],
      split: record.timelines.length,
      time: record.timelines[record.timelines.length - 1].igt,
    });
  });
  return paces;
}

export const paceSort = (a: Pace, b: Pace) => {
  if (a.split > b.split) {
    return 1;
  } else if (b.split > a.split) {
    return -1;
  } else {
    if (a.time < b.time) {
      return 1;
    } else if (b.time < a.time) {
      return -1;
    } else {
      return 0;
    }
  }
}