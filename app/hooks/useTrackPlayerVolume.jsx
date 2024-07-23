import { useCallback, useState, useEffect } from "react"
import TrackPlayer from "react-native-track-player"

export const useTrackPlayerVolume = () => {
    const [volume, setVolume] = useState()
    const getVolume = useCallback(async () => {
        const currentVolume = await TrackPlayer.getVolume()
        console.log(currentVolume)
        setVolume(currentVolume)
    }, [])

    const updateVolume = useCallback(async (newVolume) => {
        if (newVolume < 0 || newVolume > 1) {
            return
        }
        setVolume(newVolume)
        await TrackPlayer.setVolume(newVolume)
    })

    useEffect(() => {
        console.log("fetching volume")
        getVolume()

    }, [getVolume])

    return { volume, updateVolume }

}