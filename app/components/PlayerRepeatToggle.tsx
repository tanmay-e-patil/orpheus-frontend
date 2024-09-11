import { View, Text } from "react-native";
import React from "react";
import { RepeatMode } from "react-native-track-player";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import useTrackPlayerRepeatMode from "../hooks/useTrackPlayerRepeatMode";

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];

export const PlayerRepeatToggle = ({ iconSize }: { iconSize: number }) => {
  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();
  const toggleRepeatMode = () => {
    if (repeatMode == null) return;
    const currentIdx = repeatOrder.indexOf(repeatMode);
    const nextIdx = (currentIdx + 1) % repeatOrder.length;
    changeRepeatMode(repeatOrder[nextIdx]);
  };

  const iconName = () => {
    if (repeatMode === RepeatMode.Off) {
      return "repeat-off";
    } else if (repeatMode === RepeatMode.Track) {
      return "repeat-once";
    } else if (repeatMode === RepeatMode.Queue) {
      return "repeat";
    } else {
      return "repeat-off";
    }
  };

  console.log(iconName());

  return (
    <MaterialCommunityIcons
      name={iconName()}
      onPress={toggleRepeatMode}
      size={iconSize}
      color={colors.icon}
    />
  );
};
