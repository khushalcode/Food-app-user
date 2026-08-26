/**
 * Forgot Password — enter phone, request OTP.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, TextInput, Header, Icon } from '../../components';

export function ForgotPassword() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav.navigate('OtpVerify', { phone, mode: 'forgot' });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Header title={t('forgot_password') || 'Forgot Password'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.illo}>
          <Icon name="lock-reset" family="material-community" size={80} color={colors.primary} />
        </View>
        <Text style={styles.title}>{t('forgot_your_password') || 'Forgot Your Password?'}</Text>
        <Text style={styles.subtitle}>{t('please_enter_mobile') || 'Please enter your mobile number to receive a verification code.'}</Text>

        <View style={{ marginTop: 24 }}>
          <TextInput
            label={t('phone') || 'Phone'}
            value={phone}
            onChangeText={setPhone}
            placeholder="+91 98765 43210"
            keyboardType="phone-pad"
            icon="phone-outline"
          />
          <Button title={t('request_otp') || 'Request OTP'} onPress={submit} loading={loading} fullWidth size="lg" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: 20, paddingBottom: 60 },
  illo: { alignItems: 'center', marginTop: 16 },
  title: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text, textAlign: 'center', marginTop: 12 },
  subtitle: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary, textAlign: 'center', marginTop: 8, lineHeight: 22 },
});
