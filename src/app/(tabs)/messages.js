import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import { colors } from '../../constants/theme';
import { dms, users } from '../../constants/mockData';

function GroupAvatar({ members }) {
  const [a, b] = members.map((id) => users[id]);
  return (
    <View style={{ width: 48, height: 48 }}>
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <Avatar user={a} size={32} />
      </View>
      <View style={{ position: 'absolute', bottom: 0, right: 0, borderRadius: 18, borderWidth: 2, borderColor: colors.bgMain }}>
        <Avatar user={b} size={30} />
      </View>
    </View>
  );
}

function DMRow({ dm, onPress }) {
  const isGroup = dm.members.length > 1;
  const title = isGroup ? dm.name : users[dm.members[0]].name;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.bgHover }]}>
      {isGroup ? <GroupAvatar members={dm.members} /> : <Avatar user={users[dm.members[0]]} size={48} showStatus />}
      <View style={styles.rowText}>
        <View style={styles.rowTop}>
          <Text style={[styles.name, dm.unread && { fontWeight: '700' }]} numberOfLines={1}>{title}</Text>
          <Text style={styles.time}>{dm.time}</Text>
        </View>
        <Text style={[styles.last, dm.unread && { color: colors.text }]} numberOfLines={1}>{dm.last}</Text>
      </View>
      {dm.unread ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{dm.unread}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default function MessagesScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="create-outline" size={22} color={colors.text} />
        </Pressable>
      </View>
      <Pressable style={styles.search}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <Text style={styles.searchText}>Find or start a conversation</Text>
      </Pressable>
      <FlatList
        data={dms}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => <DMRow dm={item} onPress={() => router.push(`/dm/${item.id}`)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMain },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, height: 52 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgHover, alignItems: 'center', justifyContent: 'center' },
  search: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.bgDeep, margin: 16, paddingHorizontal: 12, height: 40, borderRadius: 8 },
  searchText: { color: colors.textMuted, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10 },
  rowText: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  name: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '600' },
  time: { color: colors.textMuted, fontSize: 12 },
  last: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  badge: { backgroundColor: colors.danger, minWidth: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
