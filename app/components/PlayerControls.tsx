import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { FontAwesome6 } from "@expo/vector-icons";
import { PlayerRepeatToggle } from "./PlayerRepeatToggle";

export const PlayPauseButton = ({ iconSize }: { iconSize: number }) => {
  const { playing } = useIsPlaying();
  console.log("isPlaying: ", playing);
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color="#fff"
        ></FontAwesome6>
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize }: { iconSize: number }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6 name="forward" size={iconSize} color="#fff"></FontAwesome6>
    </TouchableOpacity>
  );
};

export const SkipToPrevButton = ({ iconSize }: { iconSize: number }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome6 name="backward" size={iconSize} color="#fff"></FontAwesome6>
    </TouchableOpacity>
  );
};

// export const PlayerRepeatToggle = ({ iconSize }) => {
//     return (
//         <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
//             <FontAwesome6 name="repeat" size={iconSize} color="#fff"></FontAwesome6>
//         </TouchableOpacity>
//     )
// }

export const PlayerShuffleToggle = ({ iconSize }: { iconSize: number }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <FontAwesome6 name="shuffle" size={iconSize} color="#fff"></FontAwesome6>
    </TouchableOpacity>
  );
};

export const PlayerControls = () => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <PlayerShuffleToggle iconSize={24} />
      <SkipToPrevButton iconSize={24} />
      <PlayPauseButton iconSize={36} />
      <SkipToNextButton iconSize={24} />
      <PlayerRepeatToggle iconSize={30} />
    </View>
  );
};
