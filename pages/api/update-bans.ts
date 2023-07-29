import { refreshBannedUserCache } from "@/public/functions/bannedUsers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await refreshBannedUserCache();
  res.send(200);
}