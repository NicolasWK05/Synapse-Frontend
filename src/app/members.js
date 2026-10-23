import { View, Text, SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Avatar from '../components/Avatar';
import { colors } from '../constants/theme';
import { servers, users } from '../constants/mockData';

export default function MembersScreen() {
  const { serverId } = useLocalSearchParams();
  const server = servers.find((s) => s.id === serverId) ?? servers[0];

  const people = server.members.map((mem) => ({ ...users[mem.id], role: mem.role ?? 'member' }));
  const groups = [
    { title: 'Admin', data: people.filter((p) => p.role === 'admin' && p.status !== 'offline') },
    { title: 'Moderators', data: people.filter((p) => p.role === 'mod' && p.status !== 'offline') },
    { title: 'Online', data: people.filter((p) => p.role === 'member' && p.status !== 'offline') },
    { title: 'Offline', data: people.filter((p) => p.status === 'offline') },
  ]
    .filter((g) => g.data.length)
    .map((g) => ({ ...g, title: `${g.title} — ${g.data.length}` }));

  return (
    <SafeAreaView style={styles.root} edges={['bottom']}>
      <SectionList
        sections={groups}
        keyExtractor={(u) => u.id}
        renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
        renderItem={({ item }) => {
          const offline = item.status === 'offline';
          return (
            <View style={[styles.row, offline && { opacity: 0.45 }]}>
              <Avatar user={item} size={36} showStatus />
              <Text style={[styles.name, { color: offline ? colors.textMuted : item.color }]}>{item.name}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMain },
  header: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6, backgroundColor: colors.bgMain },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 8 },
  name: { fontSize: 16, fontWeight: '500' },
});
