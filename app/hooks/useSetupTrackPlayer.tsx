import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { useEffect, useRef } from "react";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 10 * 1024, //10MB,
  });

  await TrackPlayer.setVolume(0.5);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad: () => void }) => {
  const isInitialized = useRef(false);
  useEffect(() => {
    if (isInitialized.current) {
      console.warn(
        "useSetupTrackPlayer: isInitialized.current",
        isInitialized.current
      );
      return;
    }
    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch((error) => {
        console.error(error);
        isInitialized.current = false;
      });
  }, [onLoad]);
};
