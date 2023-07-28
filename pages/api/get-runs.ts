import { apiToPace, paceSort } from "@/public/functions/converters";
import { NextApiRequest, NextApiResponse } from "next";

const PaceManEndpoint = "https://paceman.gg/api/liveruns";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const runs = await (await fetch(PaceManEndpoint)).json();
  const paces = (await apiToPace(runs)).sort(paceSort);

  res.status(200).json(paces);
};