import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassord, setShowPassord] = useState(false)
    return (
            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center border-black-200 flex-row space-x-4">
                <TextInput className="mt-0.5 font-pregular text-white text-base flex-1" value={value} placeholder={placeholder}
                           placeholderTextColor="#7b7b8b" onChangeText={handleChangeText} secureTextEntry={title === 'Password' && !showPassord}></TextInput>
                <TouchableOpacity>
                    <Image source={icons.search} resizeMode='contain' className="w-5 h-5"></Image>
                </TouchableOpacity>
            </View> )
}

export default SearchInput