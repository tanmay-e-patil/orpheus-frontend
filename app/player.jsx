import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { PlayerControls } from './components/PlayerControls'
import PlayerProgressBar from './components/PlayerProgressBar'
import PlayerVolumeBar from './components/PlayerVolumeBar'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from './constants/colors'
import { usePlayerBackground } from './hooks/usePlayerBackground'
import { unknownTrackImageUri } from './constants/images'

const PlayerScreen = () => {
  const activeTrack = useActiveTrack()
  const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)
  if (!activeTrack) return (
    <View className="flex-1 justify-center">
      <ActivityIndicator color="#fff"></ActivityIndicator>
    </View>
  )

  return (
    <LinearGradient className="flex-1" colors={imageColors ? [imageColors.secondary, imageColors.detail] : [colors.background]}>
      <SafeAreaView className="flex-1">
        <DismissSymbol />
        <View className="flex-1 mt-12 mb-8">
          <View className="flex-row justify-center h-1/2 rounded-lg shadow-md shadow-black">
            <Image
              source={{ uri: activeTrack.artwork }}
              className="w-full h-full "
              resizeMode="contain"></Image>
          </View>

          <View className="flex-col mx-auto mt-8 items-center">
            <Text className="text-3xl text-white font-psemibold mb-0">{activeTrack.title}</Text>
            <Text className="text-lg text-gray-400 font-psemibold">{activeTrack.artist}</Text>
          </View>
          <View className="w- mx-4 mt-8">
            <PlayerProgressBar />
          </View>
          <View className="mx-4 mt-8">
            <PlayerControls />
          </View>

          <View className="mx-4 mt-8">
            <PlayerVolumeBar />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const DismissSymbol = () => {
  return (
    <View className='absolute top-16 left-0 right-0 flex-row justify-center'>
      <View accessible={false} className="w-12 h-2 rounded-full bg-slate-200"></View>
    </View>
  )
}

export default PlayerScreen
