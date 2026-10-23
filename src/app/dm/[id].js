import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ChatView from '../../components/ChatView';
import Avatar from '../../components/Avatar';
import { colors } from '../../constants/theme';
import { findDM, getMessages, users } from '../../constants/mockData';

export default function DMScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dm = findDM(id);

  if (!dm) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.textMuted }}>Conversation not found</Text>
      </View>
    );
  }

  const isGroup = dm.members.length > 1;
  return (
    <ChatView
      key={id}
      kind="dm"
      title={isGroup ? dm.name : users[dm.members[0]].name}
      icon={
        isGroup ? (
          <Ionicons name="people-circle" size={30} color={colors.textMuted} />
        ) : (
          <Avatar user={users[dm.members[0]]} size={28} showStatus />
        )
      }
      initialMessages={getMessages('dm', id)}
      onBack={() => router.back()}
    />
  );
}
