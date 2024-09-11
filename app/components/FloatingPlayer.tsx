import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls';
import useLastActiveTrack from '../hooks/useLastActiveTrack';
import { useRouter } from 'expo-router';
import { usePlayerBackground } from '../hooks/usePlayerBackground';

const FloatingPlayer = () => {
    const activeTrack = useActiveTrack()
    const lastActiveTrack = useLastActiveTrack()

    const displayedTrack = activeTrack ?? lastActiveTrack

    const { imageColors } = usePlayerBackground(displayedTrack?.artwork)

    const router = useRouter()
    const handlePress = () => {
        router.navigate("/player")
    }


    if (!displayedTrack) {
        return null
    }
    return (
        <TouchableOpacity className="absolute left-2 right-2 bottom-24 bg-black-200  h-16 rounded-lg border-2 border-black-100 " onPress={handlePress} >
            <View className="flex-row items-center  justify-between mt-2 mx-2">
                <Image
                    source={{ uri: displayedTrack.artwork }}
                    className="w-12 h-12 rounded-lg"
                    resizeMode="contain"></Image>
                <View className="flex-col justify-center flex-1">
                    <Text numberOfLines={1}
                        className="w-32 font-psemibold text-lg text-white px-4">{displayedTrack.title}</Text>
                </View>

                <View className="w-24 flex-row  justify-evenly items-center mx-2">
                    <PlayPauseButton iconSize={28} />
                    <SkipToNextButton iconSize={24} />
                </View>



            </View>
        </TouchableOpacity>
    );
};


export default FloatingPlayer