import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useTrackPlayerVolume } from '../hooks/useTrackPlayerVolume'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'

const PlayerVolumeBar = () => {
    const { volume, updateVolume } = useTrackPlayerVolume()
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    progress.value = volume ?? 0
    return (
        <View className="w-full h-12">
            <View className="flex-row items-center">
                <Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
                <View className="flex-1 flex-row px-2">
                    <Slider progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        thumbWidth={0}
                        containerStyle={{
                            borderRadius: 18
                        }}
                        renderBubble={() => null}
                        theme={
                            {
                                minimumTrackTintColor: colors.minimumTrackTintColor,
                                maximumTrackTintColor: colors.maximumTrackTintColor,
                            }
                        }

                        onValueChange={async (value) => {
                            updateVolume(value)
                        }}
                    />

                </View>

                <Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
            </View>

        </View>
    )
}

export default PlayerVolumeBar