import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { searchSpotify } from "../api/spotify_search";
import { AudioSourceModal } from "../components/AudioSourceModal";
import ItemDivider from "../components/ItemDivider";
import SearchInput from "../components/SearchInput";
import { icons, images } from "../constants";
import { SONGS_API_URL } from "../constants/strings";

const Explore = () => {
  const [query, setQuery] = useState("");
  const spotifySearch = useQuery({
    queryKey: ["search_spotify_tracks", query],
    queryFn: () => searchSpotify(query),
    staleTime: Infinity,
    enabled: !!query,
  });

  const getArtistNames = (artists) => {
    return artists.map((ar) => ar.name).join(", ");
  };

  const [modalVisible, setModalVisible] = useState(false);

  function closeAudioSourceModal() {
    setModalVisible(false);
  }

  async function addVideoDetailsToSongObject(videoId, videoDuration) {
    setSong((prev) => {
      const newState = {
        ...prev,
        yt_song_video_id: videoId,
        yt_song_duration: videoDuration,
      };
      console.log("New state:", newState);
      return newState;
    });
  }

  const [song, setSong] = useState({});

  useEffect(() => {
    const addToLibrary = async () => {
      try {
        const result = await axios.post(SONGS_API_URL, {
          song,
        });
        Alert.alert("Song added to library");
      } catch (e) {
        Alert.alert("Failed to add song to library", e);
      } finally {
        setSong({});
      }
    };
    if (song.yt_song_duration !== undefined) {
      console.log("yt_song_duration is not empty, making API call");
      addToLibrary().then((r) => console.log("Song ADDED"));
    }
  }, [song]);

  return (
    <SafeAreaView className="bg-primary w-full h-full ">
      <View className="mx-2">
        {spotifySearch.data ? (
          <FlatList
            data={spotifySearch.data?.tracks?.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row py-[2px] justify-between">
                <View className="flex-row flex-1">
                  <Image
                    source={{ uri: item.album.images[0].url }}
                    className="p-12"
                    resizeMode="contain"
                  ></Image>
                  <View className="flex-col justify-center">
                    <Text
                      numberOfLines={1}
                      className="w-48 font-psemibold text-white px-4"
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="w-48 font-pregular text-white px-4"
                    >
                      {getArtistNames(item.artists)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="justify-center"
                  onPress={() => {
                    setSong({
                      spotify_song_id: item.id.toString(),
                      spotify_song_name: item.name.toString(),
                      spotify_song_album: item.album.name.toString(),
                      spotify_song_album_art_url: item.album.images[0].url,
                      spotify_song_artist: getArtistNames(item.artists),
                      spotify_release_date: item.album.release_date,
                    });
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={icons.plus}
                    className="w-12 h-12 p-2 mx-8"
                    resizeMode="contain"
                  ></Image>
                </TouchableOpacity>
              </View>
            )}
            ListHeaderComponent={() => (
              <View className="my-6 pr-4 space-y-6">
                <View className="justify-between items-start flex-row w-full">
                  <View>
                    <Image
                      source={images.logoSmall}
                      className="w-9 h-10 mr-4 my-2"
                      resizeMode="contain"
                    ></Image>
                  </View>
                  <View className="flex-1">
                    <SearchInput
                      placeholder="Search for new songs, artists, albums"
                      onSearch={(event) => {
                        console.log("searching", event.nativeEvent.text);
                        setQuery(event.nativeEvent.text);
                      }}
                      className="p-8"
                    />
                  </View>
                </View>

                <View className="w-full flex-1 "></View>
              </View>
            )}
            ItemSeparatorComponent={() => <ItemDivider />}
          ></FlatList>
        ) : (
          <View className="my-6 pr-4 space-y-6">
            <View className="justify-between items-start flex-row w-full">
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10 mr-4 my-2"
                  resizeMode="contain"
                ></Image>
              </View>
              <View className="flex-1">
                <SearchInput
                  placeholder="Search for new songs, artists, albums"
                  onSearch={(event) => {
                    console.log("searching", event.nativeEvent.text);
                    setQuery(event.nativeEvent.text);
                  }}
                  className="p-8"
                />
              </View>
            </View>

            <View className="w-full flex-1 "></View>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          contentLabel="Select audio source"
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaProvider>
            <SafeAreaView className="bg-primary w-full h-full">
              <AudioSourceModal
                song={song}
                closeAudioSourceModal={closeAudioSourceModal}
                addVideoDetailsToSongObject={addVideoDetailsToSongObject}
              ></AudioSourceModal>
            </SafeAreaView>
          </SafeAreaProvider>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Explore;
