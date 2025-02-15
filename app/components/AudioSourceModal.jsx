import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
// import { YOUTUBE_CONTENT_DETAILS_DATA } from "../constants/dummy_data/youtube_content_details_data";
// import { YOUTUBE_SEARCH_DATA } from "../constants/dummy_data/youtube_search_data";
import { iso8601DurationToString } from "../helpers/timeConverter";
import { useQuery } from "@tanstack/react-query";
import { getContentDetails, searchYoutube } from "../api/yt_search";
import Loader from "./Loader";
// import CustomButton from "./CustomButton";

export const AudioSourceModal = ({
  song,
  closeAudioSourceModal,
  addVideoDetailsToSongObject,
}) => {
  const [videoIds, setVideoIds] = useState("");
  const query = `${song.spotify_song_name} ${song.spotify_song_artist}`;

  useEffect(() => {
    console.log(videoIds);
  }, [videoIds]);

  const youtubeSearch = useQuery({
    queryKey: ["search_youtube", query],
    queryFn: () => searchYoutube(query),
    staleTime: Infinity,
    enabled: !!query,
  });

  useEffect(() => {
    console.log("Inside onSuccess");
    const videoItems = youtubeSearch.data
      ? youtubeSearch.data.items.filter((item) => item.id.videoId)
      : [];
    const ids = videoItems.map((item) => item.id.videoId).join(",");
    console.log("Ids found", ids);
    setVideoIds(ids);
  }, [youtubeSearch.isSuccess]);

  const ytVideosContentDetails = useQuery({
    queryKey: ["youtube_fetch_content_details", videoIds],
    queryFn: () => getContentDetails(videoIds),
    enabled: !!videoIds,
    staleTime: Infinity,
  });

  console.log("Youtbe search data received", youtubeSearch.data);

  if (youtubeSearch.isLoading || ytVideosContentDetails.isLoading) {
    return <Loader></Loader>;
  }
  if (youtubeSearch.error || ytVideosContentDetails.error) {
    return (
      <Text>
        Error: {youtubeSearch.error.message || ytVideosContentDetails.error}
      </Text>
    );
  }

  //TODO: Call yt v3 api to get content details
  const getSongDuration = (videoId) => {
    const video = ytVideosContentDetails.data?.items.find(
      (i) => i.id === videoId
    );
    return video ? iso8601DurationToString(video.contentDetails.duration) : "";
  };

  return (
    <View className="mx-2 mt-4">
      {youtubeSearch.data?.items.length === 0 ? (
        <View />
      ) : (
        <FlatList
          data={youtubeSearch.data?.items.filter((item) => item.id.videoId)}
          keyExtractor={(item) => item.id?.videoId}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                className="py-2"
                onPress={async () => {
                  addVideoDetailsToSongObject(
                    item.id?.videoId,
                    getSongDuration(item.id?.videoId)
                  );
                  closeAudioSourceModal();
                }}
              >
                <VideoCard
                  video={{
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url,
                    creator: item.snippet.channelTitle,
                    duration: getSongDuration(item.id.videoId),
                  }}
                ></VideoCard>
              </TouchableOpacity>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 pr-4 space-y-6">
              <View className="justify-center items-center flex-row w-full">
                <View className="flex-row justify-center items-center">
                  <TouchableOpacity
                    className="    border-2 bg-slate-50 rounded-full"
                    onPress={closeAudioSourceModal}
                  >
                    <Text className="text-black text-lg  font-psemibold w-full p-2 px-4">
                      X
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-white text-3xl font-pbold ml-2">
                    Select audio source
                  </Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
      )}
    </View>
  );
};
