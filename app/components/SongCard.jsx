import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useActiveTrack } from 'react-native-track-player'

const SongCard = ({ song, handleTrackSelect }) => {
    const isActiveTrack = useActiveTrack()?.url === song.url;
    console.log("isActiveTrack: ", isActiveTrack)
    return (
        <TouchableOpacity className="flex-row py-[2px] justify-between" onPress={() => handleTrackSelect(song)}>
            <View className="flex-row flex-1">
                <Image
                    source={{ uri: song.artwork }}
                    className="p-12"
                    resizeMode="contain"></Image>
                <View className="flex-col justify-center">
                    <Text numberOfLines={1}
                        className="w-48 font-psemibold text-lg text-white px-4">{song.title}</Text>
                    <Text numberOfLines={1}
                        className="w-48 font-psemibold text-sm text-gray-100 px-4">{song.artist}</Text>
                    <Text numberOfLines={1}
                        className="w-48 font-pregular text-sm text-gray-100 px-4">{song.duration}</Text>
                </View>


            </View>


        </TouchableOpacity>
    )
}

export default SongCard