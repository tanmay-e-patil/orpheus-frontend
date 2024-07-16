import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
    const activeTrack = useActiveTrack()
    if (!activeTrack) return (
        <View className="flex-1 justify-center">
            <ActivityIndicator color="#fff"></ActivityIndicator>
        </View>
    )
    return (
        <SafeAreaView className="flex-1 bg-gray-800 opacity-90 p-4">
            <DismissSymbol />
            <View className="flex-1 mt-12 mb-8">
                <View className="flex-row justify-center h-1/2 rounded-lg shadow-md shadow-black">
                    <Image
                        source={{ uri: activeTrack.artwork }}
                        className="w-full h-full "
                        resizeMode="contain"></Image>
                </View>

                <View className="flex-1">
                    <View className="mt-auto">
                        <View className="h-16">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1">
                                    {/* Track title */}
                                    <Text className="text-3xl text-white font-psemibold">{activeTrack.title}</Text>

                                </View>

                            </View>

                        </View>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const DismissSymbol = () => {
    const { top } = useSafeAreaInsets()
    return (
        <View className='absolute top-16 left-0 right-0 flex-row justify-center'>
            <View accessible={false} className="w-12 h-2 rounded-full bg-slate-200"></View>
        </View>
    )
}

export default PlayerScreen