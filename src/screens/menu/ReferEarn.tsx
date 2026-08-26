/**
 * Refer & Earn — code, share, how it works.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Button, Card, AssetImage } from '../../components';
import { user } from '../../data/mock';

export function ReferEarn() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  const steps = [
    { num: '1', title: 'Invite friends', desc: 'Share your unique referral code with friends and family.' },
    { num: '2', title: 'They sign up', desc: 'Your friend installs the app and signs up using your code.' },
    { num: '3', title: 'You both earn', desc: 'You get ₹50 in wallet, your friend gets ₹50 off first order.' },
  ];

  return (
    <View style={styles.container}>
      <Header title={t('refer_earn') || 'Refer & Earn'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Icon name="gift" family="material-community" size={64} color={colors.white} />
          <Text style={styles.heroTitle}>Refer & Earn ₹50</Text>
          <Text style={styles.heroSubtitle}>Invite friends to BlinkSyGold. You both earn ₹50 when they place their first order!</Text>
        </View>

        {/* Referral code */}
        <Card>
          <Text style={styles.sectionTitle}>{t('your_referral_code') || 'Your Referral Code'}</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{user.referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn}>
              <Icon name="content-copy" family="material-community" size={16} color={colors.primary} />
              <Text style={styles.copyText}> COPY</Text>
            </TouchableOpacity>
          </View>
          <Button title={t('share') || 'Share'} onPress={() => {}} variant="primary" fullWidth size="lg" style={{ marginTop: 12 }} icon="share-variant" />
        </Card>

        {/* How it works */}
        <Card>
          <Text style={styles.sectionTitle}>{t('how_it_works') || 'How it works?'}</Text>
          {steps.map((s, i) => (
            <View key={s.num} style={[styles.stepRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>{s.num}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Invited</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Joined</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹0</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
        </View>

        <Text style={styles.terms}>{t('terms_and_conditions_apply') || 'Terms and conditions apply. Reward credited after friend places first order.'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.primary, borderRadius: 16, padding: 24, alignItems: 'center', ...shadows.lg },
  heroTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxxl, color: colors.white, marginTop: 8 },
  heroSubtitle: { fontFamily: fontFamilies.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 8, lineHeight: 18 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  codeBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1.5, borderColor: colors.primary, borderStyle: 'dashed', borderRadius: 10, padding: 12 },
  codeText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text, letterSpacing: 2 },
  copyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  copyText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.primary },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 12 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.white },
  stepTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  stepDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: 12, alignItems: 'center', ...shadows.sm },
  statValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text },
  statLabel: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  terms: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textTertiary, textAlign: 'center', marginTop: 8, lineHeight: 16 },
});
