import { isValidAuth } from "@/public/functions/backendAuth";
import { unbanUser } from "@/public/functions/bannedUsers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!isValidAuth(req, res)) return;

  const { uuid } = req.body
  if (!uuid)
    return res.send(400);

  await unbanUser(uuid);
  
  res.send(200);
}