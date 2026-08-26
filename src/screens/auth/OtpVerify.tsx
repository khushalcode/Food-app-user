/**
 * OTP verification — 6-digit input with auto-advance, resend timer.
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, radii } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, AssetImage } from '../../components';

export function OtpVerify() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerify'>>();
  const { phone, mode } = route.params || {};
  const [otp, setOtp] = useState('');
  const [resendIn, setResendIn] = useState(30);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const verify = () => {
    if (mode === 'forgot') {
      nav.replace('ResetPassword');
    } else {
      nav.replace('MainApp');
    }
  };

  const target = phone || 'your phone';

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <AssetImage name="otp_security_hero" style={{ width: 200, height: 200 }} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{t('otp_verification') || 'OTP Verification'}</Text>
      <Text style={styles.subtitle}>
        {t('enter_the_verification_sent_to') || 'Enter the verification code sent to'}{' '}
        <Text style={styles.target}>{target}</Text>
      </Text>

      <View style={styles.otpInputWrap}>
        <RNTextInput
          value={otp}
          onChangeText={(v) => setOtp(v.replace(/[^0-9]/g, '').slice(0, 6))}
          placeholder="------"
          placeholderTextColor={colors.textTertiary}
          keyboardType="numeric"
          style={styles.otpInput}
        />
      </View>

      <View style={styles.resendRow}>
        <Text style={styles.resendHint}>{t('did_not_receive_the_code') || "Didn't receive the code?"}</Text>
        {resendIn > 0 ? (
          <Text style={styles.timer}> {resendIn}s</Text>
        ) : (
          <TouchableOpacity onPress={() => setResendIn(30)}>
            <Text style={styles.resendLink}> {t('resend') || 'Resend'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Button title={t('verify') || 'Verify'} onPress={verify} fullWidth size="lg" disabled={otp.length < 6} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: 24 },
  hero: { alignItems: 'center', marginTop: 24, marginBottom: 24 },
  title: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxxl, color: colors.text, textAlign: 'center' },
  subtitle: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary, textAlign: 'center', marginTop: 8, lineHeight: 22 },
  target: { fontFamily: fontFamilies.bold, color: colors.text },
  otpInputWrap: { alignSelf: 'center', marginTop: 32, marginBottom: 16, width: '70%' },
  otpInput: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.xxxl,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 12,
  },
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  resendHint: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary },
  timer: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.primary },
  resendLink: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.primary },
});
