// import { CLIENT_ID, CLIENT_SECRET } from "@env";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const searchSpotify = async (query) => {
  console.log("Query: ", query);
  console.log("CLIENT_ID: ", CLIENT_ID);
  console.log("CLIENT_SECRET: ", CLIENT_SECRET);
  const access_token_response = await getSpotifyToken();
  console.log("access_token_response: ", access_token_response);

  const token = access_token_response?.access_token;
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&market=US&type=track&limit=3`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const searchData = await response.json();
  if (response.status === 401) {
    // Token expired, get a new one
    console.log("Token expired");
  }
  console.log("Data: ", searchData.tracks?.items);
  return searchData;
};

export const getSpotifyToken = async () => {
  console.log("Getting access token");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  console.log("access_token data: ", data);
  return data;
};
