/**
 * Wallet (Blinksy Money) — gradient hero with balance, features, Add Money CTA.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Button, Card, AssetImage, SpringScale, FadeIn, AnimatedCounter } from '../../components';
import { user, walletFeatures, walletTxns, inr } from '../../data/mock';

export function Wallet() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  return (
    <View style={styles.container}>
      <Header title={t('wallet') || 'Wallet'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 100, gap: 12 }}>
        {/* Balance card with gradient */}
        <SpringScale delay={100} initialScale={0.9}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Blinksy Money</Text>
              <AnimatedCounter value={user.walletBalance} duration={600} prefix="₹" style={styles.balanceValue} />
            </View>
            <Icon name="wallet" family="material-community" size={48} color="rgba(255,255,255,0.6)" />
          </View>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.actionPill} onPress={() => nav.navigate('AddMoney')}>
              <Icon name="plus" family="material-community" size={18} color={colors.white} />
              <Text style={styles.actionText}> Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPill} onPress={() => nav.navigate('WalletHistory')}>
              <Icon name="history" family="material-community" size={18} color={colors.white} />
              <Text style={styles.actionText}> History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionPill}>
              <Icon name="gift-outline" family="material-community" size={18} color={colors.white} />
              <Text style={styles.actionText}> Gift Card</Text>
            </TouchableOpacity>
          </View>
        </View>
        </SpringScale>

        {/* Features */}
        <Card>
          <Text style={styles.sectionTitle}>{t('why_use_wallet') || 'Why use Blinksy Money?'}</Text>
          {walletFeatures.map((f, i) => (
            <View key={f.title} style={[styles.featureRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <View style={styles.featureIcon}><Icon name={f.icon} family="material-community" size={22} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Recent transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('wallet_history') || 'Wallet History'}</Text>
          <TouchableOpacity onPress={() => nav.navigate('WalletHistory')}><Text style={styles.seeAll}>{t('see_all') || 'See All'}</Text></TouchableOpacity>
        </View>
        {walletTxns.length === 0 ? (
          <Card><Text style={styles.emptyText}>No transactions yet</Text></Card>
        ) : (
          <Card padding={0}>
            {walletTxns.slice(0, 4).map((txn, i) => (
              <View key={txn.id} style={[styles.txnRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
                <View style={[styles.txnIcon, { backgroundColor: (txn.type === 'credit' ? colors.success : colors.danger) + '20' }]}>
                  <Icon name={txn.type === 'credit' ? 'arrow-down-bold' : 'arrow-up-bold'} family="material-community" size={18} color={txn.type === 'credit' ? colors.success : colors.danger} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txnDesc} numberOfLines={1}>{txn.desc}</Text>
                  <Text style={styles.txnDate}>{txn.date}</Text>
                </View>
                <Text style={[styles.txnAmount, { color: txn.type === 'credit' ? colors.success : colors.text }]}>
                  {txn.type === 'credit' ? '+' : '-'}{inr(txn.amount)}
                </Text>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button title={t('add_money') || 'Add Money'} onPress={() => nav.navigate('AddMoney')} variant="success" size="lg" fullWidth icon="plus" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  balanceCard: { backgroundColor: colors.primary, borderRadius: 16, padding: 18, ...shadows.lg },
  balanceTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  balanceLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)' },
  balanceValue: { fontFamily: fontFamilies.black, fontSize: 40, color: colors.white, marginTop: 4 },
  balanceActions: { flexDirection: 'row', gap: 8, marginTop: 16 },
  actionPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 8, paddingVertical: 10 },
  actionText: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.white },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  seeAll: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.primary },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  featureIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  featureDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  emptyText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, textAlign: 'center', padding: 20 },
  txnRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  txnIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  txnDesc: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.text },
  txnDate: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  txnAmount: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, ...shadows.lg },
});
