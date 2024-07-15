import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import { FontAwesome6 } from '@expo/vector-icons'

export const PlayPauseButton = ({ iconSize }) => {
    const { playing } = useIsPlaying()
    console.log("isPlaying: ", playing)
    return (
        <View>
            <TouchableOpacity activeOpacity={0.85} onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
                <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color="#fff"></FontAwesome6>
            </TouchableOpacity>
        </View >
    )
}

export const SkipToNextButton = ({ iconSize }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
            <FontAwesome6 name="forward" size={iconSize} color="#fff"></FontAwesome6>
        </TouchableOpacity>
    )

}

export const SkipToPrevButton = ({ iconSize }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
            <FontAwesome6 name="backward" size={iconSize} color="#fff"></FontAwesome6>
        </TouchableOpacity>
    )
}