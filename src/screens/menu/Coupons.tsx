/**
 * Coupons — list of available / active coupons.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Card, EmptyState, Badge } from '../../components';
import { coupons } from '../../data/mock';

export function Coupons() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const active = coupons.filter((c) => c.active);
  const inactive = coupons.filter((c) => !c.active);

  return (
    <View style={styles.container}>
      <Header title={t('coupons') || 'Coupons'} subtitle={`${active.length} active`} onBack={() => nav.goBack()} />
      {coupons.length === 0 ? (
        <EmptyState image="no_data_found" title={t('no_coupon_found') || 'No coupon found'} subtitle="Check back later for new offers" />
      ) : (
        <FlatList
          data={[...active, ...inactive]}
          keyExtractor={(c) => c.id}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item }) => (
            <View style={[styles.couponCard, !item.active && styles.couponCardInactive]}>
              <View style={styles.couponLeft}>
                <Icon name="ticket-confirmation" family="material-community" size={36} color={colors.white} />
                <Text style={styles.couponDiscount}>{item.discount}</Text>
              </View>
              <View style={styles.couponBody}>
                <View style={styles.couponHeader}>
                  <Text style={styles.couponTitle}>{item.title}</Text>
                  {item.active ? <Badge label="ACTIVE" color={colors.success} /> : <Badge label="EXPIRED" color={colors.textTertiary} />}
                </View>
                <Text style={styles.couponDesc}>{item.desc}</Text>
                <Text style={styles.couponMeta}>Min order ₹{item.minOrder} • Valid till {item.validTill}</Text>
                <View style={styles.couponCodeRow}>
                  <Text style={styles.couponCode}>{item.code}</Text>
                  <TouchableOpacity style={styles.copyBtn}>
                    <Icon name="content-copy" family="material-community" size={14} color={colors.primary} />
                    <Text style={styles.copyText}> COPY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  couponCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  couponCardInactive: { opacity: 0.6 },
  couponLeft: { width: 100, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', padding: 12 },
  couponDiscount: { fontFamily: fontFamilies.bold, fontSize: 12, color: colors.white, marginTop: 8, textAlign: 'center' },
  couponBody: { flex: 1, padding: 12 },
  couponHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  couponTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, flex: 1 },
  couponDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
  couponMeta: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textTertiary, marginTop: 4 },
  couponCodeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, padding: 8, backgroundColor: colors.surfaceAlt, borderRadius: 6 },
  couponCode: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text, letterSpacing: 1 },
  copyBtn: { flexDirection: 'row', alignItems: 'center' },
  copyText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.primary },
});
