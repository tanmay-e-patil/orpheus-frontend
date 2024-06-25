import {FlatList, Image, Stylesheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {SPOTIFY_SEARCH_DATA} from "../constants/dummy_data/spotify_search_data";
import {icons, images} from "../constants";
import SearchInput from "./SearchInput";
import {YOUTUBE_SEARCH_DATA} from "../constants/dummy_data/youtube_search_data";

const AudioSourceModal = () => {
    return (
        <View className="mx-2 mt-4">
            <FlatList data={YOUTUBE_SEARCH_DATA.items} keyExtractor={(item) => item.id.videoId.toString()}
                      renderItem={({item}) => (
                          <View className="py-2">
                              <View className="flex-row flex-1 w-full my-2">
                                  <Image
                                      source={{uri: item.snippet.thumbnails.high.url}}
                                      className="w-full h-36 aspect-video"
                                      resizeMode=""></Image>



                              </View>
                              <View className="flex-col justify-start w-full">
                                  <Text numberOfLines={2}
                                        className="w-full font-psemibold text-white px-4 text-lg">{item.snippet.title}</Text>
                                  <Text numberOfLines={1} className="w-48 font-psemibold text-white px-4">{item.snippet.channelTitle}</Text>
                              </View>


                          </View>

                      )}
                      ListHeaderComponent={() => (<View className="my-6 pr-4 space-y-6">
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
