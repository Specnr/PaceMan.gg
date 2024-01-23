import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = `https://paceman.gg/api/us/trophy`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lbData = await fetch(PaceManEndpoint);
  res.status(200).json(await lbData.json());
}
