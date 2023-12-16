import { Pace, Event } from "@/components/interfaces/Pace";
import Completion from "@/components/interfaces/Completion";
import axios from "axios";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

export const apiToPace = async (paceItems: any[]): Promise<Pace[]> => {
  const filteredPace = paceItems.filter((p) => !p.isCheated && !p.isHidden);
  const mappedPace: Pace[] = [];
  for (const p of filteredPace) {
    const latestEvent = p.eventList[p.eventList.length - 1];
    if (!eventIdToName.has(latestEvent.eventId)) {
      continue;
    }

    const formattedEventList: Event[] = p.eventList.map((e: any) => ({
      name: eventIdToName.get(e.eventId)!,
      time: e.igt,
    }));

    mappedPace.push({
      nickname: await uuidToName(p.user.uuid),
      split: eventOrder.get(latestEvent.eventId),
      splitName: eventIdToName.get(latestEvent.eventId)!,
      time: latestEvent.igt,
      eventList: formattedEventList,
      uuid: p.user.uuid,
      twitch: p.user.liveAccount,
    });
  }

  return mappedPace;
};

export const paceSort = (a: Pace, b: Pace) => {
  if (a.split! > b.split!) {
    return -1;
  } else if (b.split! > a.split!) {
    return 1;
  } else {
    if (a.time < b.time) {
      return -1;
    } else if (b.time < a.time) {
      return 1;
    } else {
      return 0;
    }
  }
};

export const completionSort = (a: Completion, b: Completion) => a.time - b.time;

export const uuidToName = async (uuid: string): Promise<string> => {
  const endpoint = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
  const data = await axios.get(endpoint);
  if (data.status >= 400) return "UNKNOWN";

  return data.data.name;
};

export const nameToUuid = async (name: string): Promise<string> => {
  const endpoint = `https://api.mojang.com/users/profiles/minecraft/${name}`;
  const data = await axios.get(endpoint);
  if (data.status >= 400) return "UNKNOWN";

  let fullUuid = "";
  for (let i = 0; i < data.data.id.length; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      fullUuid += "-";
    }
    fullUuid += data.data.id.charAt(i);
  }

  return fullUuid;
};

export const apiToCompletion = async (
  completions: any[]
): Promise<Completion[]> => {
  const formattedCompletions: Completion[] = [];
  for (const completion of completions) {
    formattedCompletions.push({
      ...completion,
      nickname: await uuidToName(completion.uuid),
    });
  }

  return formattedCompletions;
};
