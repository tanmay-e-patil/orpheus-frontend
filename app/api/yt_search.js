// import { API_KEY } from '@env'
import { YOUTUBE_BASE_URL } from "../constants/strings";
const API_KEY = process.env.API_KEY;
export const searchYoutube = async (query) => {
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

export const getContentDetails = async (videoIds) => {
  const YOUTUBE_VIDEO_DETAILS_URL = YOUTUBE_BASE_URL + "videos";
  console.log("Started yt videos api");
  const response = await fetch(
    `${YOUTUBE_VIDEO_DETAILS_URL}?part=contentDetails&id=${videoIds}&key=${API_KEY}`
  );
  const contentDetails = await response.json();
  console.log("Youtube content details: ", contentDetails);
  return contentDetails;
};
