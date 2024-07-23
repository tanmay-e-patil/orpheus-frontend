import { View, Text } from 'react-native'
import React from 'react'
import { Slider } from 'react-native-awesome-slider'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useSharedValue } from 'react-native-reanimated'
import { colors } from '../constants/colors'


const formatSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

const PlayerProgressBar = () => {
    const { duration, position } = useProgress(100)

    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    const trackElapsedTime = formatSecondsToMinutes(position)
    const trackRemainingTime = formatSecondsToMinutes(duration - position)

    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0
    }

    return (
        <View className="w-full h-12">
            <Slider progress={progress}
                minimumValue={min}
                maximumValue={max}
                thumbWidth={0}
                containerStyle={{
                    borderRadius: 18
                }}
                renderBubble={() => null}
                theme={{
                    minimumTrackTintColor: colors.minimumTrackTintColor,
                    maximumTrackTintColor: colors.maximumTrackTintColor,

                }
                }

                onSlidingStart={() => (
                    isSliding.value = true
                )}
                onValueChange={async (value) => {
                    await TrackPlayer.seekTo(value * duration)
                }}
                onSlidingComplete={async (value) => {
                    if (!isSliding.value) return
                    isSliding.value = false
                    await TrackPlayer.seekTo(value * duration)
                }}
            />
            <View className="w-full flex-row justify-between items-baseline mt-2">
                <Text className="font-plight text-white ">{trackElapsedTime}</Text>

                <Text className="font-plight text-white tracking-tighter">
                    {'-'} {trackRemainingTime}
                </Text>
            </View>

        </View>
    )
}

export default PlayerProgressBar