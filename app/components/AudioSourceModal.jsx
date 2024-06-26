import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import VideoCard from "./VideoCard";
import {YOUTUBE_CONTENT_DETAILS_DATA} from "../constants/dummy_data/youtube_content_details_data";

const AudioSourceModal = ({ytSearchData, closeAudioSourceModal, addVideoDetailsToSongObject}) => {

    function iso8601DurationToString(duration) {
        // Regex to extract hours, minutes, and seconds
        const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
        const matches = duration.match(regex);

        // Extracted values (default to 0 if undefined)
        const hours = matches[1] ? parseInt(matches[1], 10) : 0;
        const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
        const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

        // Format the values into a readable string
        const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Return the final formatted string
        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }
    // console.log(ytSearchData.items.map(i => i.id.videoId.toString()).join(","))

    const ytVideoIds = ytSearchData.items.map(i => i.id.videoId.toString()).join(",")

    //TODO: Call yt v3 api to get content details
    const ytVideosContentDetails = YOUTUBE_CONTENT_DETAILS_DATA

    const getSongDuration = (videoId) => {
        // console.log(videoId)
        // console.log(ytVideosContentDetails.items.filter(i => i.id === videoId)[0].contentDetails.duration)

        return iso8601DurationToString(ytVideosContentDetails.items.filter(i => i.id === videoId)[0].contentDetails.duration)


    }


    return (
        <View className="mx-2 mt-4">
            <FlatList data={ytSearchData.items} keyExtractor={(item) => item.id.videoId.toString()}
                      renderItem={({item}) => (
                          <TouchableOpacity className="py-2" onPress={async () => {
                              addVideoDetailsToSongObject(item.id.videoId.toString(), getSongDuration(item.id.videoId.toString()))
                              closeAudioSourceModal()
                          }}>
                              <VideoCard video={{
                                  title: item.snippet.title,
                                  thumbnail: item.snippet.thumbnails.high.url,
                                  creator: item.snippet.channelTitle,
                                  duration: getSongDuration(item.id.videoId.toString())

                              }}></VideoCard>



                          </TouchableOpacity>

                      )}
                      ListHeaderComponent={() => (
                          <View className="my-6 pr-4 space-y-6">
                          <View className="justify-between items-start flex-row w-full">

                              <View>
                                  <Text className="text-white text-3xl font-pbold">Select audio source</Text>
                              </View>


                          </View>

                          <View className="w-full flex-1 "></View>
                      </View>)}
            >

            </FlatList>
        </View>


    )
}

export default AudioSourceModal
