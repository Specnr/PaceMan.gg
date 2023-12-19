import { completionSort } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = (eid: string) =>
  `https://paceman.gg/api/cs/event?id=${eid}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;

  if (!eventId) return res.send(400);

  const eventData = await (
    await fetch(PaceManEndpoint(eventId as string))
  ).json();
  const formattedCompletions = eventData.completions.sort(completionSort);

  res.status(200).json(formattedCompletions);
}
