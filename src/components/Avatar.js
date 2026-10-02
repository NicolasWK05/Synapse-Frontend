import { View, Text } from 'react-native';
import { colors } from '../constants/theme';

const statusColor = {
  online: colors.online,
  idle: colors.idle,
  dnd: colors.danger,
  offline: '#80848e',
};

export default function Avatar({ user, size = 40, showStatus = false, ringColor = colors.bgMain }) {
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: user.color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: size * 0.42 }}>
          {user.name[0].toUpperCase()}
        </Text>
      </View>
      {showStatus && (
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: size * 0.36,
            height: size * 0.36,
            borderRadius: size * 0.18,
            backgroundColor: statusColor[user.status] ?? statusColor.offline,
            borderWidth: 3,
            borderColor: ringColor,
          }}
        />
      )}
    </View>
  );
}
