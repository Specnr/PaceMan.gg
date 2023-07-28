const getTwitchAPIToken = async () => {
  let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`;
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
    "Client-Id": process.env.TWITCH_CLIENT!,
  };

  const data = await fetch(endpoint, { headers });
  return await data.json();
};

export const getLiveUserIfExists = async (user: string, alt?: string) => {
  const { data } = await sendTwitchRequest(`https://api.twitch.tv/helix/streams?user_login=${user}${alt ? `&user_login=${alt}` : ""}`);
  
  if (data && data.length > 0) {
    return data[0].user_login;
  }
  return "";
}