import {FlatList, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import {Image} from "react-native";
import SearchInput from "../components/SearchInput";
import {SPOTIFY_SEARCH_DATA} from "../constants/spotify_search_data";

const CLIENT_ID = process.env["CLIENT_ID"];
const CLIENT_SECRET = process.env["CLIENT_SECRET"];


const Explore = () => {

    // const [query, setQuery] = useState('');
    // const [results, setResults] = useState([]);
    // const [token, setToken] = useState(null);
    //
    // const getSpotifyToken = async () => {
    //     console.log("client_id", CLIENT_ID);
    //     console.log("client_secret", CLIENT_SECRET);
    //     const response = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    //         },
    //         body: 'grant_type=client_credentials'
    //     });
    //     const data = await response.json();
    //     console.log("access_token data: ", data)
    //     return data?.access_token;
    // };
    //
    // const searchSpotify = async (token, query) => {
    //     const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&market=US&type=track&limit=3`, {
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     });
    //     const data = await response.json();
    //     if (response.status === 401) {
    //         // Token expired, get a new one
    //         const newToken = await getSpotifyToken();
    //         console.log("new", newToken);
    //         setToken(newToken);
    //         // Retry the request with the new token
    //         return searchSpotify(newToken, query);
    //     }
    //     console.log("Data: ", data);
    //     return data?.tracks?.items;
    // };

    // useEffect(() => {
    //     const handleSearch =  async () => {
    //         console.log("Query: ",query.trim())
    //
    //         if (!token) {
    //             const newToken = await getSpotifyToken();
    //             setToken(newToken);
    //         }
    //         if (query.trim() === '') {
    //             setResults([]);
    //             return;
    //         }
    //         const tracks = await searchSpotify(token, query);
    //         setResults(tracks);
    //         console.log("Tracks: ", tracks);
    //         console.log("Results: ", results);
    //     };
    //
    //     handleSearch().then(r => console.log("Handling search")); // Initial search on component mount
    //
    //     // Optionally, you can debounce the search function for better performance
    //     // const debounceSearch = debounce(handleSearch, 500);
    //     // debounceSearch();
    //
    // }, [query]);

    const getArtistNames = (artists) => {
        return artists.map(
            ar => ar.name
        ).join(', ')
    }

    return (
        <SafeAreaView className="bg-primary h-full ">
            <View className="ml-4">
            <FlatList data={SPOTIFY_SEARCH_DATA.tracks.items} keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => (
                          <View className="flex-row py-[2px]">
                              <Image
                                  source={{uri: item.album.images[0].url}}
                                  className="p-12"
                                  resizeMode="contain"></Image>
                              <View className="flex-col justify-center">
                                  <Text className="font-psemibold text-white px-8">{item.name}</Text>
                                  <Text className="font-pregular text-white px-8">{getArtistNames(item.artists)}</Text>
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

export default Explore