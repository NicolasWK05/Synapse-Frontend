import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import { colors } from '../../constants/theme';
import { me } from '../../constants/mockData';

const sections = [
  {
    title: 'User settings',
    items: [
      { key: 'account', icon: 'person-circle-outline', label: 'My account' },
      { key: 'profile', icon: 'id-card-outline', label: 'Profile' },
      { key: 'privacy', icon: 'lock-closed-outline', label: 'Privacy & safety' },
      { key: 'devices', icon: 'phone-portrait-outline', label: 'Devices' },
    ],
  },
  {
    title: 'App settings',
    items: [
      { key: 'appearance', icon: 'color-palette-outline', label: 'Appearance' },
      { key: 'notifications', icon: 'notifications-outline', label: 'Notifications', toggle: true },
      { key: 'accessibility', icon: 'accessibility-outline', label: 'Accessibility' },
      { key: 'language', icon: 'language-outline', label: 'Language', value: 'English' },
      { key: 'developer', icon: 'code-slash-outline', label: 'Developer mode', toggle: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { key: 'help', icon: 'help-circle-outline', label: 'Help & support' },
      { key: 'about', icon: 'information-circle-outline', label: 'About', value: 'v1.0.0' },
    ],
  },
];

function Row({ item, last, on, onToggle }) {
  return (
    <Pressable
      onPress={item.toggle ? () => onToggle(item.key) : undefined}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.bgHover }]}
    >
      <Ionicons name={item.icon} size={22} color={colors.textMuted} />
      <Text style={styles.label}>{item.label}</Text>
      {item.toggle ? (
        <Switch
          value={on}
          onValueChange={() => onToggle(item.key)}
          trackColor={{ false: '#4e5058', true: colors.accent }}
          thumbColor="#fff"
        />
      ) : (
        <>
          {item.value ? <Text style={styles.value}>{item.value}</Text> : null}
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </>
      )}
      {!last && <View style={styles.separator} />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  // Local UI state only; nothing is persisted yet.
  const [toggles, setToggles] = useState({ notifications: true, developer: false });
  const flip = (key) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>Settings</Text>

        <Pressable style={styles.profile}>
          <View style={styles.banner} />
          <View style={styles.profileBody}>
            <View style={styles.avatarRing}>
              <Avatar user={me} size={68} showStatus ringColor={colors.bgSide} />
            </View>
            <Text style={styles.name}>{me.name}</Text>
            <Text style={styles.handle}>@{me.handle}</Text>
          </View>
        </Pressable>

        {sections.map((section) => (
          <View key={section.title}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.group}>
              {section.items.map((item, i) => (
                <Row
                  key={item.key}
                  item={item}
                  last={i === section.items.length - 1}
                  on={toggles[item.key]}
                  onToggle={flip}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={[styles.group, { marginTop: 24 }]}>
          <Pressable style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.bgHover }]}>
            <Ionicons name="log-out-outline" size={22} color={colors.danger} />
            <Text style={[styles.label, { color: colors.danger }]}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMain },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 },
  profile: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.bgSide },
  banner: { height: 72, backgroundColor: colors.accent },
  profileBody: { padding: 16, paddingTop: 44 },
  avatarRing: { position: 'absolute', top: -34, left: 16, borderRadius: 40, borderWidth: 6, borderColor: colors.bgSide },
  name: { color: colors.text, fontSize: 20, fontWeight: '800' },
  handle: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  sectionTitle: { color: colors.textMuted, fontSize: 13, fontWeight: '600', marginHorizontal: 20, marginTop: 24, marginBottom: 8 },
  group: { marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: colors.bgSide },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, minHeight: 52 },
  label: { flex: 1, color: colors.text, fontSize: 16 },
  value: { color: colors.textMuted, fontSize: 15 },
  separator: { position: 'absolute', left: 50, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: colors.divider },
});
