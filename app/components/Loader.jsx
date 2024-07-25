import { View, Text } from 'react-native'
import React from 'react'
import LoaderKit from "react-native-loader-kit"

const Loader = () => {
    return (
        <View className="w-full h-full flex-1 mx-auto my-auto ">
            <LoaderKit name="LineScaleParty" color="#fff" className="w-8 h-8" />
        </View>
    )
}

export default Loader