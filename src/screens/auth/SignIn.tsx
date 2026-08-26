/**
 * Sign In — email + password, social login, links to signup/forgot.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, radii, spacing } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, TextInput, Icon, Header } from '../../components';

export function SignIn() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav.replace('MainApp');
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Header title={t('sign_in') || 'Sign In'} showBack={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.illo}>
          <Icon name="account-circle-outline" family="material-community" size={80} color={colors.primary} />
        </View>
        <Text style={styles.welcome}>{t('login_to_continue') || 'Login to Continue'}</Text>

        <View style={{ marginTop: 24 }}>
          <TextInput
            label={t('email') || 'Email'}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            icon="email-outline"
          />
          <TextInput
            label={t('password') || 'Password'}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPass}
            icon="lock-outline"
            rightIcon={showPass ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPass(!showPass)}
          />

          <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginBottom: 16 }}>
            <Text style={styles.link}>{t('forgot_password') || 'Forgot Password?'}</Text>
          </TouchableOpacity>

          <Button title={t('sign_in') || 'Sign In'} onPress={handleSignIn} loading={loading} fullWidth size="lg" />
        </View>

        <View style={styles.orWrap}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>{t('social_login') || 'Social Login'}</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="google" family="material-community" size={22} color={colors.text} />
            <Text style={styles.socialLabel}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="facebook" family="material-community" size={22} color="#1877F2" />
            <Text style={styles.socialLabel}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="apple" family="material-community" size={22} color={colors.text} />
            <Text style={styles.socialLabel}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.signupHint}>{t('dont_have_an_account') || "Don't have an account?"} </Text>
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <Text style={styles.link}>{t('sign_up') || 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => nav.replace('MainApp')} style={{ alignSelf: 'center', marginTop: 16 }}>
          <Text style={styles.link}>{t('skip_for_now') || 'Skip for now'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: 20, paddingBottom: 60 },
  illo: { alignItems: 'center', marginTop: 8 },
  welcome: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text, textAlign: 'center', marginTop: 12 },
  link: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.primary },
  orWrap: { flexDirection: 'row', alignItems: 'center', marginVertical: 28 },
  orLine: { flex: 1, height: 1, backgroundColor: colors.divider },
  orText: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary, marginHorizontal: 12 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  socialBtn: {
    flex: 1, paddingVertical: 14, borderRadius: radii.sm, borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  socialLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.text },
  signupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 28 },
  signupHint: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary },
});
