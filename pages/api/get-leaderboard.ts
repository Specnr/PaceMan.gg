import { completionSort } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = (filter: string, removeDupes: string, date: string) =>
  `https://paceman.gg/api/cs/leaderboard?filter=${filter}&removeDuplicates=${removeDupes}&date=${date}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filterId, removeDuplicates, date } = req.query;

  if (!filterId || !removeDuplicates || !date) return res.send(400);

  const lbCompletions = await (
    await fetch(
      PaceManEndpoint(
        filterId as string,
        removeDuplicates as string,
        date as string
      )
    )
  ).json();
  const formattedCompletions = lbCompletions.sort(completionSort);

  res.status(200).json(formattedCompletions);
}
