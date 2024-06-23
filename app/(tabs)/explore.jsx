import {FlatList, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import {Image} from "react-native";
import SearchInput from "../components/SearchInput";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getSpotifyToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data?.access_token;
};

const searchSpotify = async (token, query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&market=US&type=track&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    return data;
};


const Explore = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const handleSearch =  async () => {
            console.log("Query: ",query.trim())
            if (!token) {
                const newToken = await getSpotifyToken();
                setToken(newToken);
            }
            if (query.trim() === '') {
                setResults([]);
                return;
            }
            const tracks = await searchSpotify(token, query);
            setResults(tracks);
            console.log("Tracks: ", tracks);
            console.log("Results: ", results);
        };

        handleSearch().then(r => console.log("Handling search")); // Initial search on component mount

        // Optionally, you can debounce the search function for better performance
        // const debounceSearch = debounce(handleSearch, 500);
        // debounceSearch();

    }, [query]);

        return (
        <SafeAreaView className="bg-primary">
            <FlatList data={[{id: 1}, {id: 2},]} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
                <Text className="text-3xl text-white">{item.id}</Text>
            )}
                      ListHeaderComponent={() => (
                          <View className="my-6 px-4 space-y-6">
                              <View className="justify-between items-start flex-row mb-6">
                                  <View>
                                      <Text className="text-sm text-gray-100 font-pmedium">
                                          Welcome Back!
                                      </Text>
                                      <Text className="text-2xl text-gray-100 font-psemibold">
                                          JSMastery
                                      </Text>

                                  </View>
                                  <View>
                                      <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"></Image>
                                  </View>

                              </View>
                              <SearchInput placeholder="Search for new songs, artists, albums"  onSearch={(event) => {

                                  console.log("searching", event.nativeEvent.text);
                                  setQuery(event.nativeEvent.text);
                              }} />
                              <View className="w-full flex-1 "></View>
                          </View>
                      )}
            >

            </FlatList>

        </SafeAreaView>
    )
}

export default Explore