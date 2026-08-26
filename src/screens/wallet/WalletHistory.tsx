/**
 * Wallet history — full list of transactions with filter chips.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Chip, EmptyState } from '../../components';
import { walletTxns, inr } from '../../data/mock';

export function WalletHistory() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const txns = walletTxns.filter((x) => filter === 'all' || x.type === filter);

  return (
    <View style={styles.container}>
      <Header title={t('wallet_history') || 'Wallet History'} onBack={() => nav.goBack()} />
      <View style={styles.filterRow}>
        <Chip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
        <Chip label="Credit" selected={filter === 'credit'} onPress={() => setFilter('credit')} icon="arrow-down-bold" color={colors.success} />
        <Chip label="Debit" selected={filter === 'debit'} onPress={() => setFilter('debit')} icon="arrow-up-bold" color={colors.danger} />
      </View>

      {txns.length === 0 ? (
        <EmptyState image="no_data_found" title={t('no_data_found') || 'No data found'} subtitle="Your wallet transactions will appear here" />
      ) : (
        <FlatList
          data={txns}
          keyExtractor={(x) => x.id}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: (item.type === 'credit' ? colors.success : colors.danger) + '20' }]}>
                <Icon name={item.type === 'credit' ? 'trending-up' : 'trending-down'} family="material-community" size={20} color={item.type === 'credit' ? colors.success : colors.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.txnId}>{item.id}</Text>
              </View>
              <Text style={[styles.amount, { color: item.type === 'credit' ? colors.success : colors.text }]}>
                {item.type === 'credit' ? '+' : '-'}{inr(item.amount)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filterRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12, ...shadows.sm },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  desc: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.text },
  date: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 4 },
  txnId: { fontFamily: fontFamilies.regular, fontSize: 10, color: colors.textTertiary, marginTop: 2 },
  amount: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md },
});
