import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "../constants";
import SearchInput from "../components/SearchInput";
import {SPOTIFY_SEARCH_DATA} from "../constants/dummy_data/spotify_search_data";

const Library = () => {
    return (
        <SafeAreaView className="bg-primary w-full h-full ">
            <View className="mx-2">
                <FlatList data={SPOTIFY_SEARCH_DATA.tracks.items} keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => (
                              <View className="flex-row py-[2px] justify-between">
                                  <View className="flex-row flex-1">
                                      <Image
                                          source={{uri: item.album.images[0].url}}
                                          className="p-12"
                                          resizeMode="contain"></Image>
                                      <View className="flex-col justify-center">
                                          <Text numberOfLines={1} className="w-48 font-psemibold text-white px-4">{item.name}</Text>
                                          {/*<Text numberOfLines={1} className="w-48 font-pregular text-white px-4">{getArtistNames(item.artists)}</Text>*/}
                                      </View>


                                  </View>
                                  <TouchableOpacity className="justify-center">
                                      <Image source={icons.plus} className="w-12 h-12 p-2 mx-8" resizeMode="contain"></Image>
                                  </TouchableOpacity>




                              </View>

                          )}
                          ListHeaderComponent={() => (
                              <View className="my-6 pr-4 space-y-6">
                                  <View className="justify-between items-start flex-row w-full">

                                      <View>
                                          <Image source={images.logoSmall} className="w-9 h-10 mr-4 my-2"
                                                 resizeMode="contain"></Image>
                                      </View>
                                      <View className="flex-1">
                                          <SearchInput placeholder="Search for new songs, artists, albums" onSearch={(event) => {

                                              console.log("searching", event.nativeEvent.text);
                                              setQuery(event.nativeEvent.text);
                                          }} className="p-8"/>

                                      </View>


                                  </View>

                                  <View className="w-full flex-1 "></View>
                              </View>
                          )}
                >

                </FlatList>
            </View>

        </SafeAreaView>
    )
}

export default Library