import { banUser } from "@/public/functions/bannedUsers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { auth, uuid, reason } = req.body
  if (req.method !== "POST" || !reason || !uuid) {
    res.send(400);
    return;
  }

  if (!auth || auth !== process.env.ADMIN_KEY) {
    res.send(401);
    return;
  }

  await banUser(uuid, reason);
  res.send(200);
}