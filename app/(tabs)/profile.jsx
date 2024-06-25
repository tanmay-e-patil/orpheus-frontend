import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useAuth} from "../context/AuthContext";
import {icons, images} from "../constants";
import {APP_NAME} from "../constants/strings";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import {Link, router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

const Profile = () => {
    const {user, onLogout} = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)


    const submit = async () => {

        setIsSubmitting(true)
        try {
            await onLogout()
            router.replace("/")



        } catch (e) {
            Alert.alert('ERROR', e.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6">
                    <View className="flex-row justify-between">
                        <View className="flex-row gap-2">
                            <Image source={images.logoSmall} resizeMode='contain' className="w-[35px] h-[35px]"></Image>
                            <Text className="text-3xl text-white font-psemibold text-center">{APP_NAME}</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={submit}>
                                <Image source={icons.logout} resizeMode="contain" className="w-8 h-8"></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})