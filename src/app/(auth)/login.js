import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import AuthLayout from '../../components/AuthLayout';
import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/theme';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {};
    if (!username.trim()) next.username = 'Enter your username.';
    if (!password) next.password = 'Enter your password.';
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const session = await login(username.trim(), password);
      await signIn(session); // the root layout then swaps to the main app
    } catch (e) {
      setFormError(e.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="We're so excited to see you again!"
      footer={
        <Text style={styles.muted}>
          Need an account?{' '}
          <Link href="/register" style={styles.link}>Register</Link>
        </Text>
      }
    >
      {formError ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{formError}</Text>
        </View>
      ) : null}
      <TextField
        label="Username"
        value={username}
        onChangeText={setUsername}
        error={errors.username}
        textContentType="username"
        autoComplete="username"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secure
        textContentType="password"
        autoComplete="current-password"
        onSubmitEditing={submit}
        returnKeyType="go"
      />
      <PrimaryButton title="Log in" onPress={submit} loading={loading} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, fontSize: 14 },
  link: { color: colors.accent, fontWeight: '600' },
  banner: { backgroundColor: 'rgba(242,63,67,0.15)', borderColor: colors.danger, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16 },
  bannerText: { color: colors.text, fontSize: 14 },
});
