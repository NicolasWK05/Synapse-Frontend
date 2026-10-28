import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';
import { API_URL, APP_NAME } from '../constants/config';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logo}>
            <Text style={styles.logoText}>{APP_NAME[0]}</Text>
          </View>
          <Text style={styles.brand}>{APP_NAME}</Text>

          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            {children}
          </View>

          <View style={styles.footer}>{footer}</View>
          <Text style={styles.server}>Server: {API_URL}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgDeep },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  logo: { alignSelf: 'center', width: 64, height: 64, borderRadius: 32, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  brand: { alignSelf: 'center', color: colors.text, fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 20 },
  card: { backgroundColor: colors.bgMain, borderRadius: 12, padding: 20 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textMuted, fontSize: 15, textAlign: 'center', marginTop: 6, marginBottom: 24 },
  footer: { alignItems: 'center', marginTop: 20 },
  server: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 24, opacity: 0.7 },
});
