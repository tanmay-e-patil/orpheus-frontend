import React, {createContext, useState, useEffect, useContext} from 'react';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import {ACCESS_TOKEN_KEY, BASE_URL, LOGIN_API_URL, ME_API_URL, SIGN_UP_API_URL} from "../constants/strings";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import {Alert} from "react-native";

export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState({
        token: null, authenticated: false
    })

    const [user, setUser] = useState({
        username: '',
        email: '',
        userId: ''
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
            console.log("stored: ", token)
            return token
        }

        const getUser = async () => {
            try {
                const token = await loadToken()
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                } else {
                    console.log("Logging out as token not found")
                    await logout()
                    return
                }
                console.log(axios.defaults.headers.common['Authorization'])
                const response = await axios.get(ME_API_URL, {
                    withCredentials: true
                })

                setAuthState({
                    token: token,
                    authenticated: true
                })

                setUser({
                    username: response.data.username,
                    email: response.data.email,
                    userId: response.data.id
                })

            } catch (e) {
                await logout()
            } finally {
                console.log("Done fetching user")
            }

        }
        getUser().then(r => console.log("Fetched user"))


    }, []);

    const register = async (email, username, password) => {
        try {
            const result = await axios.post(SIGN_UP_API_URL, {
                email, username, password
            })

            setAuthState({
                token: result.data.access_token,
                authenticated: true
            })

            setUser({
                username: username,
                email: email,
                userId: result.data.id
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`

            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.data.access_token)
            return result
        } catch (e) {
            return {error: true, msg: e?.response.data.msg}
        }
    }

    const login = async (email, password) => {
        try {
            const result = await axios.post(LOGIN_API_URL, {
                email, password
            })

            setAuthState({
                token: result.data.access_token,
                authenticated: true
            })

            setUser({
                username: result.data.username,
                email: email,
                userId: result.data.id
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`

            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, result.data.access_token)
            return result

        } catch (e) {
            return {error: true, msg: e?.response.data.msg}
        }


    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)

        axios.defaults.headers.common['Authorization'] = ''

        setAuthState({
            token: null,
            authenticated: false
        })

        setUser({
            username: '',
            email: '',
            userId: ''
        })

        router.replace("/")
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
