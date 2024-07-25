import { Alert, FlatList, Image, RefreshControl, Text, TouchableHighlight, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { SONGS_API_URL } from '../constants/strings';
import EmptyState from '../components/EmptyState';
import SearchInput from '../components/SearchInput';
import { images } from '../constants';
import SongCard from '../components/SongCard';
import TrackPlayer, { useQueue } from 'react-native-track-player';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import ItemDivider from '../components/ItemDivider';

const Library = () => {
  const [library, setLibrary] = useState([]);
  const [tracks, setTracks] = useState([]);
  const loadLibrary = async () => {
    try {
      const result = await axios.get(SONGS_API_URL);
      setLibrary(result.data);
      console.log(result.data);
      trackPlayerFormattedSongs = result.data.map(song => {
        return {
          id: song.id,
          url: SONGS_API_URL + "/" + song.id, // URL to your M4A file
          title: song.name,
          artist: song.artist_name,
          artwork: song.album_art,
          duration: song.duration// URL to artwork
        }
      }
      )
      setTracks(trackPlayerFormattedSongs)

    } catch (e) {
      Alert.alert('Failed to fetch songs to library', e);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await loadLibrary();
    setRefreshing(false);
  };

  useEffect(() => {
    loadLibrary().then(r => console.log('Loaded library'));
  }, []);

  const handleTrackSelect = async (track) => {
    console.log(track)
    await TrackPlayer.load(track)
    await TrackPlayer.play()
  }





  return (
    <SafeAreaView className="bg-primary w-full h-full ">
      <View className="mx-2 h-full">
        <FlatList data={tracks} keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongCard song={item} handleTrackSelect={handleTrackSelect} />

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

                      console.log('searching', event.nativeEvent.text);
                      setQuery(event.nativeEvent.text);
                    }} className="p-8" />
                </View>


              </View>

              <View className="w-full flex-1 "></View>
            </View>
          )}
          ItemSeparatorComponent={() => (<ItemDivider></ItemDivider>)}

          ListEmptyComponent={() => (<EmptyState title="No Songs Found"
            subtitle="Add music via the explore tab."></EmptyState>)}
          refreshControl={<RefreshControl refreshing={refreshing}
            onRefresh={onRefresh}></RefreshControl>}>

        </FlatList>

      </View>


    </SafeAreaView>
  );
};

export default Library;