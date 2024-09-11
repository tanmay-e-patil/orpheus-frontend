import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import { colors } from "../constants/colors";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<ImageColorsResult>();
  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors));
  }, [imageUrl]);

  return { imageColors };
};
