import { apiToCompletion, completionSort } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = (eid: string) => `https://paceman.gg/api/events/completions?event=${eid}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;

  if (!eventId) return res.send(400);

  const eventCompletions = await (await fetch(PaceManEndpoint(eventId as string))).json();
  const formattedCompletions = (await apiToCompletion(eventCompletions)).sort(completionSort);

  res.status(200).json(formattedCompletions);
};