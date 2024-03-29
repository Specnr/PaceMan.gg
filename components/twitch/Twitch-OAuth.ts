export const getTwitchOAuthURL = (mcToken: string) => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID || "",
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL || "",
    response_type: "code",
    scope: "openid",
    force_verify: "false",
    state: mcToken
  });
  return new URL(`https://id.twitch.tv/oauth2/authorize?${decodeURIComponent(params.toString())}`);
};