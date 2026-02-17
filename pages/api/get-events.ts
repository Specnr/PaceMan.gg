import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = "https://paceman.gg/api/cs/eventlist";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const events = await (await fetch(PaceManEndpoint)).json();

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.status(200).json(events);
};