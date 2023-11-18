import axios from 'axios';

const getTwitchAPIToken = async () => {
  let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`;
  const data = await fetch(url, { method: "POST" });
  return await data.json();
}

const sendTwitchRequest = async (endpoint: string) => {
  const token = await getTwitchAPIToken();
  let { access_token, token_type } = token;

  token_type = token_type.substring(0, 1).toUpperCase() + token_type.substring(1, token_type.length);
  const authorization = `${token_type} ${access_token}`;

  const headers = {
    authorization,
    "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
  };

  const data = await fetch(endpoint, { headers });
  return await data.json();
};

export const sendTwitchAuthCode = (code: any) => {
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

export const getUserWithToken = (token: any) => {
  return axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: "Bearer " + token,
      "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
    }
  })
}