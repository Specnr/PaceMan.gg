import { MongoClient } from "mongodb";
const EventsCol = new MongoClient(process.env.MONGO_URI || "").db().collection('Events');

export const validEventStates = new Set<string>([ "PRESTART", "START", "PAUSE", "UNPAUSE", "END" ]);

export const getEventByName = async (name: string) => EventsCol.findOne({ name });

export const isNextStateValid = async (name: string, state: string) => {
  const event = await getEventByName(name);
  console.log(event)
  if (!event && state === "PRESTART") {
    return true;
  }
  if (!event || event.state === "END") {
    return false;
  }
  if (event.state === "PRESTART" && state === "START") {
    return true;
  }
  if ((event.state === "START" && state === "END") || (event.state === "START" && state === "PAUSE")) {
    return true;
  }
  if (event.state === "PAUSE" && state === "UNPAUSE") {
    return true;
  }
  if ((event.state === "UNPAUSE" && state === "PAUSE") || (event.state === "UNPAUSE" && state === "END")) {
    return true;
  }
  return false;
};

export const updateEventState = async (name: string, state: string) => {
  let update;
  let push = {};
  if (state === "PRESTART") {
    update = { $set: { name, state, start: [], end: [], whitelist: [] } };
  }
  else if (state === "START" || state === "UNPAUSE") {
    update = { $set: { name, state } };
    push = { $push: { start: Date.now() } };
  } else if (state === "END" || state === "PAUSE") {
    update = { $set: { name, state } };
    push = { $push: { end: Date.now() } };
  }
  return EventsCol.updateOne({ name }, { ...update, ...push }, { upsert: true });
}

export const addToWhitelist = async (name: string, uuid: string) =>
  EventsCol.updateOne({ name }, { $push: { whitelist: uuid } });