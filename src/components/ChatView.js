import { useEffect, useMemo, useState } from 'react';
import {
  View, Text, FlatList, TextInput, Pressable, StyleSheet,
  KeyboardAvoidingView, Platform, Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { colors } from '../constants/theme';
import { users } from '../constants/mockData';

export default function ChatView({ kind, title, icon, initialMessages, onBack, onMembers }) {
  const insets = useSafeAreaInsets();
  const [msgs, setMsgs] = useState(initialMessages);
  const [text, setText] = useState('');
  const [keyboardUp, setKeyboardUp] = useState(false);

  useEffect(() => {
    const ios = Platform.OS === 'ios';
    const show = Keyboard.addListener(ios ? 'keyboardWillShow' : 'keyboardDidShow', () => setKeyboardUp(true));
    const hide = Keyboard.addListener(ios ? 'keyboardWillHide' : 'keyboardDidHide', () => setKeyboardUp(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  // Inverted list: newest message first so the chat opens scrolled to the bottom.
  const data = useMemo(() => [...msgs].reverse(), [msgs]);

  const send = () => {
    const body = text.trim();
    if (!body) return;
    setMsgs((list) => [...list, { id: String(Date.now()), user: 'me', day: 'Today', time: 'Just now', text: body }]);
    setText('');
  };

  const toggleReaction = (msgId, emoji) =>
    setMsgs((list) =>
      list.map((msg) =>
        msg.id !== msgId ? msg : {
          ...msg,
          reactions: msg.reactions.map((r) =>
            r.emoji !== emoji ? r : { ...r, mine: !r.mine, count: r.count + (r.mine ? -1 : 1) },
          ),
        },
      ),
    );

  const renderItem = ({ item, index }) => {
    const older = data[index + 1];
    const showDay = !older || older.day !== item.day;
    const grouped = !!older && !showDay && older.user === item.user && !item.reply;
    const u = users[item.user];

    return (
      <View>
        {showDay && (
          <View style={styles.dayRow}>
            <View style={styles.dayLine} />
            <Text style={styles.dayText}>{item.day}</Text>
            <View style={styles.dayLine} />
          </View>
        )}
        <View style={[styles.msg, { marginTop: grouped ? 2 : showDay ? 8 : 16 }]}>
          {item.reply && (
            <View style={styles.reply}>
              <View style={styles.replyCurve} />
              <Text style={styles.replyText} numberOfLines={1}>
                <Text style={{ color: users[item.reply.user]?.color ?? colors.text, fontWeight: '600' }}>
                  @{users[item.reply.user]?.name ?? item.reply.user}{'  '}
                </Text>
                {item.reply.text}
              </Text>
            </View>
          )}
          <View style={styles.msgMain}>
            <View style={{ width: 40 }}>{!grouped && <Avatar user={u} size={40} />}</View>
            <View style={{ flex: 1 }}>
              {!grouped && (
                <View style={styles.msgHead}>
                  <Text style={[styles.author, { color: u.color }]}>{u.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              )}
              <Text style={styles.body}>{item.text}</Text>
              {item.reactions?.length ? (
                <View style={styles.reactions}>
                  {item.reactions.map((r) => (
                    <Pressable
                      key={r.emoji}
                      onPress={() => toggleReaction(item.id, r.emoji)}
                      style={[styles.reaction, r.mine && styles.reactionMine]}
                    >
                      <Text style={styles.reactionEmoji}>{r.emoji}</Text>
                      <Text style={[styles.reactionCount, r.mine && { color: colors.text }]}>{r.count}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const prefix = kind === 'channel' ? '#' : '@';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        {icon}
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {kind === 'dm' ? (
          <>
            <Ionicons name="call-outline" size={22} color={colors.textMuted} />
            <Ionicons name="videocam-outline" size={24} color={colors.textMuted} />
          </>
        ) : (
          <>
            <Ionicons name="search" size={22} color={colors.textMuted} />
            <Pressable onPress={onMembers} hitSlop={10}>
              <Ionicons name="people" size={22} color={colors.textMuted} />
            </Pressable>
          </>
        )}
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <FlatList
          inverted
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingVertical: 8 }}
          ListFooterComponent={
            <View style={styles.intro}>
              <View style={styles.introIcon}>
                <Text style={{ color: '#fff', fontSize: 34, fontWeight: '700' }}>{prefix}</Text>
              </View>
              <Text style={styles.introTitle}>
                {kind === 'channel' ? `Welcome to #${title}` : title}
              </Text>
              <Text style={styles.introSub}>
                {kind === 'channel'
                  ? `This is the start of the #${title} channel.`
                  : `This is the beginning of your conversation with ${title}.`}
              </Text>
            </View>
          }
        />

        <View style={[styles.composer, { paddingBottom: keyboardUp ? 10 : Math.max(insets.bottom, 10) }]}>
          <Pressable style={styles.roundBtn}>
            <Ionicons name="add" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.inputWrap}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder={`Message ${prefix}${title}`}
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <Ionicons name="happy-outline" size={22} color={colors.textMuted} />
          </View>
          {text.trim() ? (
            <Pressable onPress={send} style={[styles.roundBtn, { backgroundColor: colors.accent }]}>
              <Ionicons name="send" size={18} color="#fff" />
            </Pressable>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMain },
  header: {
    height: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.divider,
  },
  title: { flex: 1, color: colors.text, fontSize: 17, fontWeight: '700' },
  intro: { padding: 16, paddingTop: 32 },
  introIcon: { width: 68, height: 68, borderRadius: 34, backgroundColor: colors.bgHover, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  introTitle: { color: colors.text, fontSize: 26, fontWeight: '800' },
  introSub: { color: colors.textMuted, fontSize: 15, marginTop: 4 },
  dayRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginTop: 16 },
  dayLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.divider },
  dayText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  msg: { paddingHorizontal: 16 },
  msgMain: { flexDirection: 'row', gap: 12 },
  msgHead: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  author: { fontSize: 16, fontWeight: '600' },
  time: { color: colors.textMuted, fontSize: 12 },
  body: { color: colors.text, fontSize: 16, lineHeight: 22 },
  reply: { flexDirection: 'row', alignItems: 'center', gap: 6, marginLeft: 20, marginBottom: 4 },
  replyCurve: { width: 18, height: 10, borderTopLeftRadius: 6, borderTopWidth: 2, borderLeftWidth: 2, borderColor: colors.divider, marginTop: 6 },
  replyText: { flex: 1, color: colors.textMuted, fontSize: 13 },
  reactions: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  reaction: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: colors.bgSide, borderWidth: 1, borderColor: 'transparent' },
  reactionMine: { borderColor: colors.accent, backgroundColor: colors.bgHover },
  reactionEmoji: { fontSize: 14 },
  reactionCount: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 10, paddingHorizontal: 10, backgroundColor: colors.bgMain },
  roundBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgHover, alignItems: 'center', justifyContent: 'center' },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgHover, borderRadius: 20, paddingHorizontal: 14, height: 40 },
  input: { flex: 1, color: colors.text, fontSize: 16 },
});
