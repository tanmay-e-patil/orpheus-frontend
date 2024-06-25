import {View, Text, ScrollView, Image, Alert} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import FormField from '../components/FormField'
import { useState } from 'react'
import CustomButton from '../components/CustomButton'
import {Link, router} from 'expo-router'
import {APP_NAME, SIGN_UP_API_URL} from "../constants/strings";
import {useAuth} from "../context/AuthContext";

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const {onRegister} = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password || !form.username) {
            Alert.alert("Error! Please fill in all fields")
        }
        setIsSubmitting(true)
        try {
            const response = await onRegister(form.email, form.username, form.password)
            if (!response.ok) {
               Alert.alert("Error! Sign up failed")
            } else {
                router.replace("/")
            }


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
                    <View className="flex-row gap-2">
                        <Image source={images.logoSmall} resizeMode='contain' className="w-[35px] h-[35px]"></Image>
                        <Text className="text-3xl text-white font-psemibold text-center">{APP_NAME}</Text>
                    </View>
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to {APP_NAME}</Text>
                    <FormField title="Username" value={form.username} handleChangeText={(e) => setForm({ ...form, username: e })} otherStyles="mt-10"></FormField>

                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"></FormField>
                    <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })} otherStyles="mt-7" keyboardType="password"></FormField>
                    <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting}></CustomButton>
                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                        <Link href={"/sign-in"} className='text-lg font-psemibold pb-10 text-secondary '>Sign In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp