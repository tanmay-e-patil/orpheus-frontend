import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import FormField from '../components/FormField'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { Link } from 'expo-router'
import {APP_NAME} from "../constants/strings";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = () => { }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[85vh] px-4 my-6">
                    <View className="flex-row gap-2">
                        <Image source={images.logoSmall} resizeMode='contain' className="w-[35px] h-[35px]"></Image>
                        <Text className="text-3xl text-white font-psemibold text-center">{APP_NAME}</Text>
                    </View>

                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to {APP_NAME}</Text>
                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"></FormField>
                    <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password"></FormField>
                    <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}></CustomButton>
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have an account</Text>
                        <Link href={"/sign-up"} className='text-lg font-psemibold pb-10 text-secondary '>Sign up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn