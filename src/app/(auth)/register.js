import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import AuthLayout from '../../components/AuthLayout';
import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/theme';
import { register } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

// Limits come from the API's RegisterRequest schema.
function validate({ username, email, password }) {
  const e = {};
  if (username.length < 3 || username.length > 50) e.username = 'Username must be 3–50 characters.';
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 255) e.email = 'Enter a valid email address.';
  if (password.length < 8 || password.length > 100) e.password = 'Password must be 8–100 characters.';
  return e;
}

export default function RegisterScreen() {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async () => {
    const clean = { ...form, username: form.username.trim(), email: form.email.trim() };
    const next = validate(clean);
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const session = await register(clean.username, clean.email, clean.password);
      await signIn(session);
    } catch (e) {
      setFormError(e.message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join the conversation."
      footer={
        <Text style={styles.muted}>
          Already have an account?{' '}
          <Link href="/login" style={styles.link}>Log in</Link>
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
        value={form.username}
        onChangeText={set('username')}
        error={errors.username}
        maxLength={50}
        autoComplete="username-new"
      />
      <TextField
        label="Email"
        value={form.email}
        onChangeText={set('email')}
        error={errors.email}
        keyboardType="email-address"
        maxLength={255}
        autoComplete="email"
      />
      <TextField
        label="Password"
        value={form.password}
        onChangeText={set('password')}
        error={errors.password}
        secure
        maxLength={100}
        autoComplete="new-password"
        onSubmitEditing={submit}
        returnKeyType="go"
      />
      <PrimaryButton title="Continue" onPress={submit} loading={loading} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, fontSize: 14 },
  link: { color: colors.accent, fontWeight: '600' },
  banner: { backgroundColor: 'rgba(242,63,67,0.15)', borderColor: colors.danger, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 16 },
  bannerText: { color: colors.text, fontSize: 14 },
});
