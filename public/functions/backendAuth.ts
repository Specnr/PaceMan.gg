import { NextApiRequest, NextApiResponse } from "next";

export const isValidAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const { auth } = req.body
  if (req.method !== "POST") {
    res.send(400);
    return false;
  }

  if (!auth || auth !== process.env.ADMIN_KEY) {
    res.send(401);
    return false;
  }
  return true;
}