import { Pace, Event, AAPace } from "@/components/interfaces/Pace";
import Completion from "@/components/interfaces/Completion";
import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const eventIdToName = new Map<string, string>([
  ["rsg.enter_nether", "Enter Nether"],
  ["rsg.enter_bastion", "Enter Bastion"],
  ["rsg.enter_fortress", "Enter Fortress"],
  ["rsg.first_portal", "First Portal"],
  ["rsg.second_portal", "Second Portal"],
  ["rsg.enter_stronghold", "Enter Stronghold"],
  ["rsg.enter_end", "Enter End"],
  ["rsg.credits", "Finish"],
]);

export const eventOrder = new Map([
  ["rsg.enter_nether", 0],
  ["rsg.enter_bastion", 1],
  ["rsg.enter_fortress", 2],
  ["rsg.first_portal", 3],
  ["rsg.second_portal", 4],
  ["rsg.enter_stronghold", 5],
  ["rsg.enter_end", 6],
  ["rsg.credits", 7],
]);

export const goodPaceSplits = new Map([
  ["s2", 270000], // 4:30
  ["rsg.first_portal", 360000], // 6:00
  ["rsg.enter_stronghold", 450000], // 7:30
  ["rsg.enter_end", 480000], // 8:00
  ["rsg.credits", 600000], // 10:00
]);

export const apiToPace = async (paceItems: any[]): Promise<Pace[]> => {
  const filteredPace = paceItems.filter((p) => !p.isCheated && !p.isHidden);
  const mappedPace: Pace[] = [];
  for (const p of filteredPace) {
    const latestEvent = p.eventList[p.eventList.length - 1];
    if (!eventIdToName.has(latestEvent.eventId)) {
      continue;
    }

    let isHighQuality = false;

    if (p.eventList.length === 3) {
      isHighQuality = latestEvent.igt <= goodPaceSplits.get("s2")!; // 4:30
    } else if (goodPaceSplits.has(latestEvent.eventId)) {
      isHighQuality =
        latestEvent.igt <= goodPaceSplits.get(latestEvent.eventId)!;
    }

    const formattedEventList: Event[] = p.eventList.map((e: any) => ({
      name: eventIdToName.get(e.eventId)!,
      time: e.igt,
    }));

    mappedPace.push({
      nickname: p.nickname,
      split: eventOrder.get(latestEvent.eventId),
      splitName: eventIdToName.get(latestEvent.eventId)!,
      time: latestEvent.igt,
      eventList: formattedEventList,
      uuid: p.user.uuid,
      twitch: p.user.liveAccount,
      lastUpdated: p.lastUpdated,
      isHighQuality,
      itemEstimates: p.itemData ? p.itemData.estimatedCounts : null
    });
  }

  return mappedPace;
};

export const paceSort = (a: Pace, b: Pace) => {
  if (a.isHighQuality && !b.isHighQuality) {
    return -1;
  }
  if (b.isHighQuality && !a.isHighQuality) {
    return 1;
  }
  // Sort on event count if S1/S2
  // Sort on split index otherwise
  if (
    a.split! === eventOrder.get("rsg.enter_fortress") ||
    b.split! === eventOrder.get("rsg.enter_fortress") ||
    a.split! === eventOrder.get("rsg.enter_bastion") ||
    b.split! === eventOrder.get("rsg.enter_bastion")
  ) {
    if (a.eventList.length > b.eventList.length) {
      return -1;
    } else if (b.eventList.length > a.eventList.length) {
      return 1;
    }
  } else {
    if (a.split! > b.split!) {
      return -1;
    } else if (b.split! > a.split!) {
      return 1;
    }
  }
  // Otherwise splits are the same
  if (a.time < b.time) {
    return -1;
  } else if (b.time < a.time) {
    return 1;
  } else {
    return 0;
  }
};

export const completionSort = (a: Completion, b: Completion) => a.time - b.time;

export const apiToAAPace = async (aaPaceItems: any[]): Promise<AAPace[]> => {
  const filteredPace = aaPaceItems.filter((p) => !p.isCheated && !p.isHidden);
  const mappedPace: AAPace[] = [];
  for (const p of filteredPace) {

    const formattedCompletedList: Event[] = p.completed.map((e: any) => ({
      name: e.eventId,
      time: e.igt,
    }));

    mappedPace.push({
      completed: formattedCompletedList,
      context: p.context,
      currentTime: p.currentTime,
      uuid: p.user.uuid,
      twitch: p.user.liveAccount,
      lastUpdated: p.lastUpdated,
      nickname: p.nickname,
      criterias: p.criterias
    });
  }

  return mappedPace;
};

export const AAPaceSort = (a: AAPace, b: AAPace) => {
  // TODO: Look into better ways of sorting this...
  return a.completed.length - b.completed.length;
};
