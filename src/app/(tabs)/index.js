import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import { colors } from '../../constants/theme';
import { servers, users, me } from '../../constants/mockData';

const serverHasUnread = (s) =>
  s.categories.some((c) => c.channels.some((ch) => ch.unread || ch.mentions));

function ServerRail({ activeId, onSelect }) {
  return (
    <View style={styles.rail}>
      <ScrollView contentContainerStyle={{ paddingVertical: 8 }} showsVerticalScrollIndicator={false}>
        {servers.map((s) => {
          const active = s.id === activeId;
          const unread = serverHasUnread(s);
          return (
            <View key={s.id} style={styles.railItem}>
              <View style={[styles.pill, { height: active ? 36 : 8, opacity: active || unread ? 1 : 0 }]} />
              <Pressable
                onPress={() => onSelect(s.id)}
                style={[styles.serverIcon, { backgroundColor: active ? s.color : colors.bgMain, borderRadius: active ? 16 : 24 }]}
              >
                <Text style={styles.serverInitials}>{s.initials}</Text>
              </Pressable>
            </View>
          );
        })}
        <View style={styles.railDivider} />
        <View style={styles.railItem}>
          <Pressable style={[styles.serverIcon, { backgroundColor: colors.bgMain }]}>
            <Ionicons name="add" size={26} color={colors.online} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function ChannelRow({ channel, onPress }) {
  const highlighted = channel.unread || channel.mentions;
  const isText = channel.type === 'text';
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.channel, pressed && { backgroundColor: colors.bgHover }]}
      >
        {isText ? (
          <Text style={[styles.hash, highlighted && { color: colors.text }]}>#</Text>
        ) : (
          <Ionicons name="volume-high" size={18} color={colors.textMuted} />
        )}
        <Text style={[styles.channelName, highlighted && { color: colors.text, fontWeight: '600' }]} numberOfLines={1}>
          {channel.name}
        </Text>
        {channel.mentions ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{channel.mentions}</Text>
          </View>
        ) : null}
      </Pressable>
      {channel.participants?.map((id) => (
        <View key={id} style={styles.participant}>
          <Avatar user={users[id]} size={22} />
          <Text style={styles.participantName}>{users[id].name}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ServersScreen() {
  const router = useRouter();
  const [activeId, setActiveId] = useState(servers[0].id);
  const [collapsed, setCollapsed] = useState({});
  const server = servers.find((s) => s.id === activeId);

  const toggle = (name) => setCollapsed((c) => ({ ...c, [`${activeId}:${name}`]: !c[`${activeId}:${name}`] }));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ServerRail activeId={activeId} onSelect={setActiveId} />

      <View style={styles.panel}>
        <View style={styles.serverHeader}>
          <Text style={styles.serverName} numberOfLines={1}>{server.name}</Text>
          <Ionicons name="person-add-outline" size={20} color={colors.textMuted} />
          <Ionicons name="chevron-down" size={18} color={colors.text} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 12 }}>
          {server.categories.map((cat) => {
            const isCollapsed = collapsed[`${activeId}:${cat.name}`];
            return (
              <View key={cat.name} style={{ marginTop: 16 }}>
                <Pressable onPress={() => toggle(cat.name)} style={styles.catRow}>
                  <Ionicons name={isCollapsed ? 'chevron-forward' : 'chevron-down'} size={12} color={colors.textMuted} />
                  <Text style={styles.catName}>{cat.name}</Text>
                </Pressable>
                {!isCollapsed &&
                  cat.channels.map((ch) => (
                    <ChannelRow
                      key={ch.id}
                      channel={ch}
                      onPress={() => ch.type === 'text' && router.push(`/channel/${ch.id}`)}
                    />
                  ))}
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.userBar}>
          <Avatar user={me} size={34} showStatus ringColor={colors.bgDeep} />
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{me.name}</Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
          <Ionicons name="mic" size={20} color={colors.textMuted} />
          <Ionicons name="headset" size={20} color={colors.textMuted} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: colors.bgDeep },
  rail: { width: 72, backgroundColor: colors.bgDeep },
  railItem: { width: 72, height: 56, alignItems: 'center', justifyContent: 'center', marginVertical: 2 },
  railDivider: { alignSelf: 'center', width: 32, height: 2, borderRadius: 1, backgroundColor: colors.divider, marginVertical: 4 },
  pill: { position: 'absolute', left: 0, width: 4, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: colors.text },
  serverIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  serverInitials: { color: '#fff', fontWeight: '700', fontSize: 16 },
  panel: { flex: 1, backgroundColor: colors.bgSide, borderTopLeftRadius: 16 },
  serverHeader: { height: 52, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider },
  serverName: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '700' },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingBottom: 4 },
  catName: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  channel: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 8, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 6 },
  hash: { width: 18, textAlign: 'center', color: colors.textMuted, fontSize: 20, fontWeight: '500' },
  channelName: { flex: 1, color: colors.textMuted, fontSize: 16 },
  badge: { backgroundColor: colors.danger, minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  participant: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 42, paddingVertical: 4 },
  participantName: { color: colors.textMuted, fontSize: 14 },
  userBar: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, backgroundColor: colors.bgDeep },
  userName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  userStatus: { color: colors.textMuted, fontSize: 12 },
});
