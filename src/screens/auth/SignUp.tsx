/**
 * Sign Up — first/last name, email, phone, password, confirm.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, radii } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, TextInput, Header } from '../../components';

export function SignUp() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm({ ...form, [k]: v });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = t('enter_your_first_name') || 'Enter your first name';
    if (!form.email.includes('@')) e.email = t('enter_a_valid_email_address') || 'Enter a valid email address';
    if (form.phone.length < 10) e.phone = t('invalid_phone_number') || 'Invalid phone number';
    if (form.password.length < 6) e.password = t('password_should_be') || 'Password should be at least 6 characters';
    if (form.confirm !== form.password) e.confirm = t('confirm_password_does_not_matched') || 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav.navigate('OtpVerify', { phone: form.phone, mode: 'signup' });
    }, 600);
  };

  return (
    <View style={styles.container}>
      <Header title={t('sign_up') || 'Sign Up'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.welcome}>{t('create_your_account') || 'Create your account'}</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TextInput label={t('first_name') || 'First Name'} value={form.firstName} onChangeText={set('firstName')} placeholder="John" error={errors.firstName} icon="account-outline" />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput label={t('last_name') || 'Last Name'} value={form.lastName} onChangeText={set('lastName')} placeholder="Doe" icon="account-outline" />
          </View>
        </View>

        <TextInput label={t('email') || 'Email'} value={form.email} onChangeText={set('email')} placeholder="you@example.com" keyboardType="email-address" error={errors.email} icon="email-outline" />
        <TextInput label={t('phone') || 'Phone'} value={form.phone} onChangeText={set('phone')} placeholder="+91 98765 43210" keyboardType="phone-pad" error={errors.phone} icon="phone-outline" />
        <TextInput label={t('password') || 'Password'} value={form.password} onChangeText={set('password')} placeholder="••••••••" secureTextEntry icon="lock-outline" error={errors.password} />
        <TextInput label={t('confirm_password') || 'Confirm Password'} value={form.confirm} onChangeText={set('confirm')} placeholder="••••••••" secureTextEntry icon="lock-check-outline" error={errors.confirm} />

        <Button title={t('sign_up') || 'Sign Up'} onPress={submit} loading={loading} fullWidth size="lg" style={{ marginTop: 8 }} />

        <View style={styles.signupRow}>
          <Text style={styles.hint}>{t('already_have_an_account') || 'Already have an account?'} </Text>
          <TouchableOpacity onPress={() => nav.replace('SignIn')}>
            <Text style={styles.link}>{t('sign_in') || 'Sign In'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: 20, paddingBottom: 60 },
  welcome: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text, marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row' },
  signupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  hint: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary },
  link: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.primary },
});
