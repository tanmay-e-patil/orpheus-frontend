// import React, { createContext, useState, useEffect } from 'react';
// import * as Keychain from 'react-native-keychain';
// import axios from 'axios';
//
// export const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const loadTokens = async () => {
//             try {
//                 const credentials = await Keychain.getGenericPassword();
//                 if (credentials) {
//                     const { accessToken } = JSON.parse(credentials.password);
//                     const user = await fetchUser(accessToken);
//                     setUser(user);
//                 }
//             } catch (error) {
//                 console.error("Failed to load tokens", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         loadTokens().then(r => console.log("Loaded tokens", r));
//     }, []);
//
//     const fetchUser = async (token) => {
//         try {
//             const response = await axios.get('http://your-server-url/v1/users/me', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Failed to fetch user", error);
//             return null;
//         }
//     };
//
//     const signIn = async (username, password) => {
//         try {
//             const response = await axios.post('http://your-server-url/v1/login', { username, password });
//             const { accessToken, refreshToken } = response.data;
//
//             await Keychain.setGenericPassword('authTokens', JSON.stringify({ accessToken, refreshToken }));
//
//             const user = await fetchUser(accessToken);
//             setUser(user);
//         } catch (error) {
//             console.error('Login Failed', error);
//         }
//     };
//
//     const signOut = async () => {
//         setUser(null);
//         await Keychain.resetGenericPassword();
//     };
//
//     const contextValue = {
//         user,
//         signIn,
//         signOut,
//         loading,
//     };
//
//     return (
//         <AuthContext.Provider value={contextValue}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };
