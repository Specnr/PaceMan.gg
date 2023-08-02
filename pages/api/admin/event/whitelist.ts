import { isValidAuth } from "@/public/functions/backendAuth";
import { addToWhitelist } from "@/public/functions/events";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!isValidAuth(req, res)) return;

  const { uuid, name } = req.body
  if (!name || !uuid)
    return res.send(400);

  await addToWhitelist(name, uuid);

  res.send(200);
}