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

export const isUserBanned = async (uuid: string) => bannedUserCache.has(uuid);
