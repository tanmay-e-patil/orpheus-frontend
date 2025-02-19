import {Image, Stylesheet, Text, View} from 'react-native'
import React from 'react'

const VideoCard = ({video:{title, thumbnail, creator, duration}}) => {
    return (
        <View>
            <View className="flex-row w-full my-2">
                <Image
                    source={{uri: thumbnail}}
                    className="w-full h-36 aspect-video"
                    resizeMode=""></Image>


            </View>
            <View className="flex-col justify-start w-full rounded">
                <Text numberOfLines={2}
                      className="w-full font-psemibold text-white px-4 text-lg">{title}</Text>
                <Text numberOfLines={1}
                      className="w-48 font-pregular text-white px-4">{creator}</Text>
                <Text numberOfLines={1}
                      className="w-48 font-pregular text-white px-4">{duration}</Text>
            </View>
        </View>
    )
}

export default VideoCard
