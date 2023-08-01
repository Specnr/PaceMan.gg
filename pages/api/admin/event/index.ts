import { isValidAuth } from "@/public/functions/backendAuth";
import { isNextStateValid, updateEventState, validEventStates } from "@/public/functions/events";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!isValidAuth(req, res)) return;

  const { state, name } = req.body
  if (!name || !state || !validEventStates.has(state.toUpperCase()))
    return res.send(400);

  if (!(await isNextStateValid(name, state.toUpperCase())))
    return res.send(400);

  await updateEventState(name, state.toUpperCase());

  res.send(200);
}