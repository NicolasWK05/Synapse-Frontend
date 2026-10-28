import Constants from 'expo-constants';

export const APP_NAME = 'Synapse';

// Where the backend lives.
//  - Set EXPO_PUBLIC_API_URL (e.g. in a .env file) to override.
//  - Otherwise we reuse the IP of the machine running `expo start`, so Expo Go on a
//    physical phone can reach a backend running on your computer (port 5172).
//  - "localhost" alone would point at the phone itself, which is why it isn't the default.
function defaultApiUrl() {
  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  // return `http://${host || 'localhost'}:5172`;
  return 'http://10.0.1.131:5172'; // Replace with your backend IP address and port
}

export const API_URL = (process.env.EXPO_PUBLIC_API_URL || defaultApiUrl()).replace(/\/+$/, '');
