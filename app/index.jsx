import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from './constants';
import CustomButton from './components/CustomButton';
import {APP_NAME, LANDING_SLOGAN, LANDING_SLOGAN_DESC} from "./constants/strings";
import React from "react";

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full min-h-[85vh] justify-center items-center  px-4">
                    <View className="flex-row gap-2">
                        <Image source={images.logoSmall} resizeMode='contain' className="w-[35px] h-[35px]"></Image>
                        <Text className="text-3xl text-white font-psemibold text-center">{APP_NAME}</Text>
                    </View>
                    <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode='contain'>
                    </Image>

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            {LANDING_SLOGAN}
                        </Text>
                    </View>

                    <Text className="text=sm font-pregular text-gray-100 mt-7 text-center">{LANDING_SLOGAN_DESC}</Text>
                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => { router.push('/library') }}
                        containerStyles="w-full mt-7" />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light'></StatusBar>

        </SafeAreaView >
    );
}

