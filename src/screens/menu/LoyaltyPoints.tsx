/**
 * Loyalty Points — points balance + convert to wallet money.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Button, Card, EmptyState } from '../../components';
import { user } from '../../data/mock';

export function LoyaltyPoints() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  return (
    <View style={styles.container}>
      <Header title={t('loyalty_points') || 'Loyalty Points'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}>
        {/* Points hero */}
        <View style={styles.hero}>
          <Icon name="star-shooting" family="material-community" size={48} color={colors.white} />
          <Text style={styles.heroValue}>{user.loyaltyPoints}</Text>
          <Text style={styles.heroLabel}>Convertible Points</Text>
        </View>

        {/* Convert card */}
        <Card>
          <Text style={styles.sectionTitle}>{t('convert_to_wallet_money') || 'Convert to Wallet Money'}</Text>
          <Text style={styles.convertHint}>{t('your_loyalty_point_will_convert_to_currency_and_transfer_to_your_wallet') || 'Your loyalty points will convert to currency and transfer to your wallet.'}</Text>
          <View style={styles.convertRow}>
            <View style={styles.convertBox}>
              <Text style={styles.convertLabel}>Points</Text>
              <Text style={styles.convertValue}>{user.loyaltyPoints}</Text>
            </View>
            <Icon name="arrow-right" family="material-community" size={24} color={colors.primary} />
            <View style={styles.convertBox}>
              <Text style={styles.convertLabel}>Wallet</Text>
              <Text style={styles.convertValue}>₹{Math.floor(user.loyaltyPoints / 10)}</Text>
            </View>
          </View>
          <Button title="Convert to Wallet Money" variant="success" fullWidth size="lg" style={{ marginTop: 12 }} disabled={user.loyaltyPoints === 0} />
        </Card>

        {/* How it works */}
        <Card>
          <Text style={styles.sectionTitle}>How to earn points?</Text>
          <BulletItem icon="shopping" text="Earn 1 point for every ₹10 spent on orders" />
          <BulletItem icon="star-plus" text="Bonus points on first order of the week" />
          <BulletItem icon="gift" text="Refer friends and earn 50 points per signup" />
          <BulletItem icon="trophy" text="Reach 1000 points to unlock Gold tier" />
        </Card>

        {/* History */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('points_history') || 'Points History'}</Text>
        </View>
        <EmptyState image="no_data_found" title="No history yet" subtitle="Earn points by placing orders" />
      </ScrollView>
    </View>
  );
}

function BulletItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletIcon}><Icon name={icon} family="material-community" size={16} color={colors.primary} /></View>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.primary, borderRadius: 16, padding: 24, alignItems: 'center', ...shadows.lg },
  heroValue: { fontFamily: fontFamilies.black, fontSize: 56, color: colors.white, marginTop: 8 },
  heroLabel: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)' },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  convertHint: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginBottom: 12 },
  convertRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  convertBox: { flex: 1, backgroundColor: colors.surfaceAlt, borderRadius: 10, padding: 12, alignItems: 'center' },
  convertLabel: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  convertValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text, marginTop: 4 },
  sectionHeader: { paddingHorizontal: 4, marginTop: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  bulletIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  bulletText: { flex: 1, fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.text, lineHeight: 18 },
});
