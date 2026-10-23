import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import { dms } from '../../constants/mockData';

const unreadDMs = dms.reduce((n, d) => n + (d.unread ?? 0), 0);
const icon = (on, off) => ({ color, size, focused }) => (
  <Ionicons name={focused ? on : off} size={size} color={color} />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bgDeep, borderTopColor: colors.divider },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Servers', tabBarIcon: icon('home', 'home-outline') }} />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: icon('chatbubble', 'chatbubble-outline'),
          tabBarBadge: unreadDMs || undefined,
          tabBarBadgeStyle: { backgroundColor: colors.danger, color: '#fff' },
        }}
      />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('settings', 'settings-outline') }} />
    </Tabs>
  );
}
