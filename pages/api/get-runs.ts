import Pace from "@/components/interfaces/Pace";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Get the runs from paceman
  // TODO: Format them how we want in frontend

  res.status(200).json([
    {
      nickname: "Specnr",
      split: "Entered Fortress",
      time: 307200,
      uuid: "3af49e58-862d-4dd8-b61a-b45e2829a0a1",
      twitch: "specnrd"
    },
    {
      nickname: "Feinberg",
      split: "Entered Bastion",
      time: 207200,
      uuid: "9a8e24df-4c85-49d6-96a6-951da84fa5c4",
      twitch: "feinberg"
    },
    {
      nickname: "Crookst",
      split: "Entered Nether",
      time: 107200,
      uuid: "19e7a6dc-6798-4dc4-ba13-7200c611e743"
    }
  ] as Pace[]);
};