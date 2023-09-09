import { MongoClient } from "mongodb";
const UsersCol = new MongoClient(process.env.MONGO_URI || "").db().collection('Users');

export const upsertUser = (twitchId: string, uuid: string, accessCode: string) =>
  UsersCol.updateOne({ uuid }, { $set: { accessCode, twitchId }, $setOnInsert: { uuid, banned: false, alt: null, daily: 0, weekly: 0, monthly: 0 } }, { upsert: true });