import {FlatList, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants";
import {Image} from "react-native";
import SearchInput from "../components/SearchInput";

const Explore = () => {
    return (
        <SafeAreaView className="bg-primary">
            <FlatList data={[{id: 1}, {id: 2},]} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
                <Text className="text-3xl text-white">{item.id}</Text>
            )}
                      ListHeaderComponent={() => (
                          <View className="my-6 px-4 space-y-6">
                              <View className="justify-between items-start flex-row mb-6">
                                  <View>
                                      <Text className="text-sm text-gray-100 font-pmedium">
                                          Welcome Back!
                                      </Text>
                                      <Text className="text-2xl text-gray-100 font-psemibold">
                                          JSMastery
                                      </Text>

                                  </View>
                                  <View>
                                      <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain"></Image>
                                  </View>

                              </View>
                              <SearchInput placeholder="Search for new songs, artists, albums"/>
                              <View className="w-full flex-1 "></View>
                          </View>
                      )}
            >

            </FlatList>

        </SafeAreaView>
    )
}

export default Explore