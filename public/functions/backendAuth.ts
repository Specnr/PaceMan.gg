import { NextApiRequest, NextApiResponse } from "next";

export const isValidAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const { auth } = req.body
  if (req.method !== "POST") {
    res.send(400);
    return false;
  }

  if (!auth || auth !== process.env.ADMIN_KEY) {
    res.send(401);
    return false;
  }
  return true;
}

const sendCode = (code: any) => {
  const formData = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
    client_secret: process.env.TWITCH_SECRET || "",
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.TOKEN_REDIRECT_URL || ""
  });

  try {
    return axios.post("https://id.twitch.tv/oauth2/token", formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

const getUser = (token: any) => {
  return axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: "Bearer " + token,
      "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
    }
  })
}