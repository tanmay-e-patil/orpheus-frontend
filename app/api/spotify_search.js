import { CLIENT_ID, CLIENT_SECRET } from '@env'

export const searchSpotify = async (query) => {
    const access_token_response = await getSpotifyToken()

    const token = access_token_response?.access_token
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&market=US&type=track&limit=3`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const searchData = await response.json();
    if (response.status === 401) {
        // Token expired, get a new one
        console.log("Token expired");
    }
    console.log("Data: ", searchData.tracks?.items);
    return searchData;

}

export const getSpotifyToken = async () => {

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    console.log("access_token data: ", data)
    return data
};