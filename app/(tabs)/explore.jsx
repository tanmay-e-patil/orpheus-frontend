import {Alert, FlatList, Modal, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import {Image} from "react-native";
import SearchInput from "../components/SearchInput";
import {SPOTIFY_SEARCH_DATA} from "../constants/dummy_data/spotify_search_data";
import {icons} from "../constants";
import AudioSourceModal from "../components/AudioSourceModal";
import {YOUTUBE_SEARCH_DATA} from "../constants/dummy_data/youtube_search_data";
import axios from "axios";
import {LOGIN_API_URL, SONGS_API_URL} from "../constants/strings";

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
        return artists.map(ar => ar.name).join(', ')
    }

    const [modalVisible, setModalVisible] = useState(false);

    function closeAudioSourceModal() {
        setModalVisible(false)
    }

    async function addVideoDetailsToSongObject(videoId, videoDuration) {
        setSong(prev => {
            const newState = { ...prev, yt_song_video_id: videoId, yt_song_duration: videoDuration };
            console.log("New state:", newState);
            return newState;
        });

    }

    const [song, setSong] = useState({
    })

    useEffect(() => {
        const addToLibrary = async () => {
            try {
                const result = await axios.post(SONGS_API_URL, {
                    song
                })
                Alert.alert("Song added to library")

            } catch (e) {
                Alert.alert("Failed to add song to library", e)
            } finally {
                setSong({

                })
            }
        }
        if (song.yt_song_duration !== undefined) {
            console.log("yt_song_duration is not empty, making API call");
            addToLibrary().then(r => console.log("Song ADDED"))
        }
    }, [song]);

    return (<SafeAreaView className="bg-primary w-full h-full ">
        <View className="mx-2">

            <FlatList data={SPOTIFY_SEARCH_DATA.tracks.items} keyExtractor={(item) => item.id.toString()}
                      renderItem={({item}) => (<View className="flex-row py-[2px] justify-between">
                              <View className="flex-row flex-1">
                                  <Image
                                      source={{uri: item.album.images[0].url}}
                                      className="p-12"
                                      resizeMode="contain"></Image>
                                  <View className="flex-col justify-center">
                                      <Text numberOfLines={1}
                                            className="w-48 font-psemibold text-white px-4">{item.name}</Text>
                                      <Text numberOfLines={1}
                                            className="w-48 font-pregular text-white px-4">{getArtistNames(item.artists)}</Text>
                                  </View>


                              </View>
                              <TouchableOpacity className="justify-center" onPress={() => {
                                  setSong({
                                      spotify_song_id: item.id.toString(),
                                      spotify_song_name: item.name.toString(),
                                      spotify_song_album: item.album.name.toString(),
                                      spotify_song_album_art_url: item.album.images[0].url,
                                      spotify_song_artist: getArtistNames(item.artists)
                                  })
                                  setModalVisible(true)
                              }}>
                                  <Image source={icons.plus} className="w-12 h-12 p-2 mx-8"
                                         resizeMode="contain"></Image>
                              </TouchableOpacity>


                          </View>

                      )}
                      ListHeaderComponent={() => (<View className="my-6 pr-4 space-y-6">
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
                      </View>)}
            >

            </FlatList>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                contentLabel="Select audio source"
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <SafeAreaProvider>
                    <SafeAreaView className="bg-primary w-full h-full">
                        <AudioSourceModal ytSearchData={YOUTUBE_SEARCH_DATA}
                                          closeAudioSourceModal={closeAudioSourceModal}
                                          addVideoDetailsToSongObject={addVideoDetailsToSongObject}></AudioSourceModal>

                    </SafeAreaView>
                </SafeAreaProvider>


            </Modal>
        </View>

    </SafeAreaView>)
}

export default Explore