import { Event, useTrackPlayerEvents } from 'react-native-track-player';

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged];

export const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, async (event) => {
    if (event.type === Event.PlaybackError) {
      console.warn(`PlaybackError: ${event}`);
    }
    if (event.type === Event.PlaybackState) {
      console.log('PlaybackState: ', event.state);
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log('PlaybackActiveTrackChanged: ', event.index);
    }

    console.log('Event: ', event);
  });
};