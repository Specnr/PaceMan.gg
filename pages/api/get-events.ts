import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = "https://paceman.gg/api/events";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const events = await (await fetch(PaceManEndpoint)).json();

  res.status(200).json(events);
};