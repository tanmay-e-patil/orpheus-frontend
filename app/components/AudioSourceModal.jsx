import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {YOUTUBE_SEARCH_DATA} from "../constants/dummy_data/youtube_search_data";
import VideoCard from "./VideoCard";

const AudioSourceModal = ({ytSearchData, closeAudioSourceModal}) => {
    return (
        <View className="mx-2 mt-4">
            <FlatList data={ytSearchData.items} keyExtractor={(item) => item.id.videoId.toString()}
                      renderItem={({item}) => (
                          <TouchableOpacity className="py-2" onPress={() => {
                              closeAudioSourceModal()
                          }}>
                              <VideoCard video={{
                                  title: item.snippet.title,
                                  thumbnail: item.snippet.thumbnails.high.url,
                                  creator: item.snippet.channelTitle

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
