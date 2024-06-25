import {Stylesheet, Text, View} from 'react-native'
import React from 'react'

const VideoCard = ({video:{title, thumbnail, creator}}) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default VideoCard
