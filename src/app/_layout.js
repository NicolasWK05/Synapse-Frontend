import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgMain } }}>
        <Stack.Screen name="(tabs)" />
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
      </Stack>
    </>
  );
}
