import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Get the runs from paceman
  // TODO: Format them how we want in frontend

  res.status(200).json([
    {
      nickname: "Specnr",
      split: "Entered Fortress",
      advancement: "Test",
      time: 307200,
      uuid: "3af49e58-862d-4dd8-b61a-b45e2829a0a1"
    }
  ]);
};