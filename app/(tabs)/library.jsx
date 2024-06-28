import {Alert, FlatList, Image, RefreshControl, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import {SONGS_API_URL} from "../constants/strings";
import EmptyState from "../components/EmptyState";
import SearchInput from "../components/SearchInput";
import {images} from "../constants";
// import {images} from "../constants/images"

const Library = () => {
    const [library, setLibrary] = useState([])
    const loadLibrary = async () => {
        try {
            const result = await axios.get(SONGS_API_URL)
            setLibrary(result.data)
            console.log(result.data)

        } catch (e) {
            Alert.alert("Failed to fetch songs to library", e)
        }
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await loadLibrary();
        setRefreshing(false);
    };

    useEffect(() => {
        loadLibrary().then(r => console.log("Loaded library"))
    }, []);

    return (
        <SafeAreaView className="bg-primary w-full h-full ">
            <View className="mx-2">
                <FlatList data={library} keyExtractor={(item) => item.ID}
                          renderItem={({item}) => (
                              <View className="flex-row py-[2px] justify-between">
                                  <View className="flex-row flex-1">
                                      <Image
                                          source={{uri: item.AlbumArt}}
                                          className="p-12"
                                          resizeMode="contain"></Image>
                                      <View className="flex-col justify-center">
                                          <Text numberOfLines={1}
                                                className="w-48 font-psemibold text-white px-4">{item.Name}</Text>
                                      </View>


                                  </View>


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
                                          <SearchInput placeholder="Search for new songs, artists, albums"
                                                       onSearch={(event) => {

                                                           console.log("searching", event.nativeEvent.text);
                                                           setQuery(event.nativeEvent.text);
                                                       }} className="p-8"/>
                                      </View>


                                  </View>

                                  <View className="w-full flex-1 "></View>
                              </View>
                          )} ListEmptyComponent={() => (<EmptyState title="No Songs Found"
                                                                    subtitle="Add music via the explore tab."></EmptyState>)}
                          refreshControl={<RefreshControl refreshing={refreshing}
                                                          onRefresh={onRefresh}></RefreshControl>}>

                </FlatList>

            </View>


        </SafeAreaView>
    )
}

export default Library