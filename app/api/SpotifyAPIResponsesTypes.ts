export interface SpotifySearchAPIResponse {
  href: string;
  limit: number;
  next: string;
  offset: string;
  previous: number | null;
  total: number;
  items: SpotifySearchTracksItem[];
}

export interface SpotifySearchTrackAlbum {
  album_type: string;
  total_tracks: number;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyAlbumArtwork[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: SpotifySearchTrackArtist[];
  is_playable: boolean;
}

export interface SpotifySearchTrackArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyAlbumArtwork {
  url: string;
  height: number;
  width: number;
}
export interface SpotifySearchTracksItem {
  album: SpotifySearchTrackAlbum;
  artists: SpotifySearchTrackArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: any;
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface SpotifyClientToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}
