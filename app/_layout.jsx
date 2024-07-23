import React, { useCallback, useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { AuthProvider } from './context/AuthContext';
import { useSetupTrackPlayer } from './hooks/useSetupTrackPlayer';
import { useLogTrackPlayerState } from './hooks/useLogTrackPlayerState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
  });


  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  console.log('Setting up player');
  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useLogTrackPlayerState();

  if (!fontsLoaded && !error) {
    return null;
  }

  return (

    <AuthProvider>
      <GestureHandlerRootView>


        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name='player' options={{
            headerShown: false,
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationDuration: 400
          }}></Stack.Screen>
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
