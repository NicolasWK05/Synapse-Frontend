import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

export default function TextField({ label, error, secure, style, ...props }) {
  const [hidden, setHidden] = useState(!!secure);
  return (
    <View style={[{ marginBottom: 16 }, style]}>
      <Text style={[styles.label, error && { color: colors.danger }]}>{label}</Text>
      <View style={[styles.box, error && { borderColor: colors.danger }]}>
        <TextInput
          {...props}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
  box: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgDeep, borderRadius: 8, borderWidth: 1, borderColor: 'transparent', paddingHorizontal: 12, height: 48 },
  input: { flex: 1, color: colors.text, fontSize: 16 },
  error: { color: colors.danger, fontSize: 13, marginTop: 6 },
});
