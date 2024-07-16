import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Ionicons } from '@expo/vector-icons'
import LoaderKit from "react-native-loader-kit"
const SongCard = ({ song, handleTrackSelect }) => {
    const isActiveTrack = useActiveTrack()?.url === song.url;
    console.log("isActiveTrack: ", isActiveTrack)
    const { playing } = useIsPlaying()
    return (
        <TouchableOpacity onPress={() => handleTrackSelect(song)}>
            <View className="flex-row space-x-4 items-center pr-4">
                <View className="relative w-24 h-24">
                    <Image
                        source={{ uri: song.artwork }}
                        className="w-full h-full"
                        resizeMode="contain"></Image>
                    <View className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-4" >
                        {isActiveTrack && (playing ?
                            (<LoaderKit name="LineScaleParty" color="#fff" className="w-8 h-8" />) :
                            (<Ionicons name='play' size={36} color='#fff' className="w-8 h-8"></Ionicons>))}

                    </View>


                </View>
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