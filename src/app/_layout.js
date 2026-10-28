import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgDeep, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  const loggedIn = !!session;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgMain } }}>
      {/* Logged out: only the auth screens exist. */}
      <Stack.Protected guard={!loggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      {/* Logged in: the actual app. */}
      <Stack.Protected guard={loggedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="channel/[id]" />
        <Stack.Screen name="dm/[id]" />
        <Stack.Screen
          name="members"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Members',
            headerStyle: { backgroundColor: colors.bgMain },
            headerTintColor: colors.text,
            headerShadowVisible: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </AuthProvider>
  );
}
