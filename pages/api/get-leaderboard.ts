import { apiToCompletion, completionSort } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = (filter: string, removeDupes: string) =>
  `https://paceman.gg/api/cs/leaderboard?filter=${filter}&removeDuplicates=${removeDupes}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filterId, removeDuplicates } = req.query;

  if (!filterId || !removeDuplicates) return res.send(400);

  const lbCompletions = await (
    await fetch(PaceManEndpoint(filterId as string, removeDuplicates as string))
  ).json();
  const formattedCompletions = (await apiToCompletion(lbCompletions)).sort(
    completionSort
  );

  res.status(200).json(formattedCompletions);
}
