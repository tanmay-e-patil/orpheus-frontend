export interface YoutubeSearchAPIResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: YoutubeSearchItem[];
}

interface YoutubeSearchItem {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
  snippet: YoutubeSearchSnippet;
}

interface YoutubeSearchSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YoutubeThumbnail;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface YoutubeThumbnail {
  default: YoutubeThumbnailInfo;
  medium: YoutubeThumbnailInfo;
  high: YoutubeThumbnailInfo;
}

interface YoutubeThumbnailInfo {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeVideosListAPIResponse {
  kind: string;
  etag: string;
  items: YoutubeVideosListItem[];
  pageInfo: { totalResults: number; resultsPerPage: number };
}

interface YoutubeVideosListItem {
  kind: string;
  etag: string;
  id: string;
  contentDetails: YoutubeVideosContentDetails;
}

interface YoutubeVideosContentDetails {
  duration: string;
  dimensions: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: string;
  projection: string;
}
