import { NextApiRequest, NextApiResponse } from "next";
import randomstring from "randomstring";
import axios from "axios";

import { sendTwitchAuthCode, getUserWithToken } from "@/public/functions/twitchIntegration";
import { upsertUser } from "@/public/functions/users";

const getMcUUIDWithToken = async (token: string) => {
  try {
    const authRes = await axios.get(`https://auth.aristois.net/token/${token}`);
    if (!authRes || !authRes.data) return;
  
    return authRes.data.uuid;
  } catch {
    return;
  }
}

const redirectToErrorPage = (res: NextApiResponse) => { res.redirect(process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + "error" : "https://paceman.gg/error") };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state: mcToken, error } = req.query
  // Add a 401 error code page on the ui
  if (error || !code) return redirectToErrorPage(res);

  // Get a twich token
  const tokenData = await sendTwitchAuthCode(code);
  if (!tokenData || !mcToken) return redirectToErrorPage(res);
  
  // Use the token to get twitch name
  const user = await getUserWithToken(tokenData.data.access_token);
  if (!user || !user.data.data || user.data.data.length !== 1) return redirectToErrorPage(res);

  const twitchId = user.data.data[0].id;
  const accessCode = randomstring.generate()

  // Get uuid with mcToken
  const uuid = await getMcUUIDWithToken(mcToken as string);
  if (!uuid) return redirectToErrorPage(res);

  // Store access code, uuid and twitch id in db
  await upsertUser(twitchId, uuid, accessCode);

  const encryptedCode = Buffer.from(accessCode).toString('base64');

  // Show the code to the user
  res.redirect(process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + "token/" + encryptedCode : `https://paceman.gg/token/${encryptedCode}`);
};