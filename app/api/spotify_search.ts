import { CLIENT_ID, CLIENT_SECRET } from "@env";
import {
  SpotifyClientToken,
  SpotifySearchAPIResponse,
} from "./SpotifyAPIResponsesTypes";
import { QueryFunction } from "@tanstack/react-query";

export const searchSpotify: QueryFunction<
  SpotifySearchAPIResponse,
  ["search_spotify_tracks", string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  //TODO: Try not to get access_token on every request
  const access_token_response = await getSpotifyToken();

  const token = access_token_response?.access_token;
  console.log("Starting api request for", query);
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

  if (response.status === 401) {
    // Token expired, get a new one
    console.log("Token expired.");
  }
  const searchData = await response.json();
  console.log("Data: ", searchData.tracks?.items);
  return searchData;
};

export const getSpotifyToken: () => Promise<SpotifyClientToken> = async () => {
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
