import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export default function PrimaryButton({ title, onPress, loading }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [styles.btn, (pressed || loading) && { opacity: 0.8 }]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: colors.accent, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  text: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
