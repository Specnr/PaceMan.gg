import { nameToUuid } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = (uuid: string) =>
  `https://paceman.gg/api/us/user?uuid=${uuid}&sortByTime=1`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  if (!name) return res.send(400);

  try {
    const userData = await (
      await fetch(PaceManEndpoint(await nameToUuid(name as string)))
    ).json();

    res.status(200).json({
      ...userData.user,
      completions: userData.completions,
      pbs: userData.pbs,
    });
  } catch {
    return res.status(404).json(`Could not find user with nickname ${name}`);
  }
}
