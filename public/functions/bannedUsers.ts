import { MongoClient } from 'mongodb';
const BannedUsersCol = new MongoClient(process.env.MONGO_URI || "").db().collection('BannedUsers');

export const isUserBanned = async (uuid: string) => !!(await BannedUsersCol.findOne({ uuid }));
