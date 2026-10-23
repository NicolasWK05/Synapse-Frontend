import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ChatView from '../../components/ChatView';
import { colors } from '../../constants/theme';
import { findChannel, getMessages } from '../../constants/mockData';

export default function ChannelScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const found = findChannel(id);

  if (!found) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.textMuted }}>Channel not found</Text>
      </View>
    );
  }

  return (
    <ChatView
      key={id}
      kind="channel"
      title={found.channel.name}
      icon={<Text style={{ color: colors.textMuted, fontSize: 22, fontWeight: '600' }}>#</Text>}
      initialMessages={getMessages('channel', id)}
      onBack={() => router.back()}
      onMembers={() => router.push({ pathname: '/members', params: { serverId: found.server.id } })}
    />
  );
}
