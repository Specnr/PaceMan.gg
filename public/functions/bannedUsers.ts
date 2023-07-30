import { MongoClient, WithId, Document, FindCursor } from 'mongodb';
const BannedUsersCol = new MongoClient(process.env.MONGO_URI || "").db().collection('BannedUsers');

interface BannedUser extends WithId<Document> {
  uuid: string;
  reason: string;
  timestamp: number;
};

let bannedUserCache = new Set();
export const refreshBannedUserCache = async () => {
  bannedUserCache = new Set();
  const bans = (await BannedUsersCol.find({}).toArray()) as BannedUser[];
  bans.forEach(ban => bannedUserCache.add(ban.uuid));
};

export const isUserBanned = async (uuid: string) => {
  // If cache is empty, refresh it
  if (bannedUserCache.size === 0) {
    await refreshBannedUserCache()
  }
  return bannedUserCache.has(uuid)
};

export const banUser = async (uuid: string, reason: string) => {
  await BannedUsersCol.updateOne({ uuid }, { $set: { uuid, reason, timestamp: Date.now() } }, { upsert: true });
  // Add to cache
  bannedUserCache.add(uuid);
};
