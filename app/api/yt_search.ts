import { API_KEY } from "@env";
import { YOUTUBE_BASE_URL } from "../constants/strings";
import { QueryFunction } from "@tanstack/react-query";
import {
  YoutubeSearchAPIResponse,
  YoutubeVideosListAPIResponse,
} from "./YoutubeAPIResponseTypes";

export const searchYoutube: QueryFunction<
  YoutubeSearchAPIResponse,
  ["search_youtube", string]
> = async ({ queryKey }) => {
  const query = queryKey[1];
  const YOUTUBE_SEARCH_URL = YOUTUBE_BASE_URL + "search";
  console.log("Started yt search api");
  const response = await fetch(
    `${YOUTUBE_SEARCH_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`
  );
  const searchData = await response.json();
  console.log("Youtube Search Data", searchData);
  return searchData;
};

export const getContentDetails: QueryFunction<
  YoutubeVideosListAPIResponse,
  ["youtube_fetch_content_details", string]
> = async ({ queryKey }) => {
  const videoIds = queryKey[1];
  const YOUTUBE_VIDEO_DETAILS_URL = YOUTUBE_BASE_URL + "videos";
  console.log("Started yt videos api");
  const response = await fetch(
    `${YOUTUBE_VIDEO_DETAILS_URL}?part=contentDetails&id=${videoIds}&key=${API_KEY}`
  );
  const contentDetails = await response.json();
  console.log("Youtube content details: ", contentDetails);
  return contentDetails;
};
