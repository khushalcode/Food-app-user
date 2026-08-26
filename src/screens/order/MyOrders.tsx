/**
 * My Orders — food orders only, sub-tabs Running/History.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OrdersStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, EmptyState, Chip, FoodImage } from '../../components';
import { orders, findStore, inr, type Order } from '../../data/mock';

export function MyOrders() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();
  const [subTab, setSubTab] = useState<'running' | 'history'>('running');

  const filtered = orders.filter((o) => {
    if (subTab === 'running') return o.status === 'running';
    return o.status !== 'running';
  });

  return (
    <View style={styles.container}>
      <Header title={t('my_orders') || 'My Orders'} showBack={false} />

      {/* Sub tabs */}
      <View style={styles.subTabsRow}>
        <Chip label={t('running') || 'Running'} selected={subTab === 'running'} onPress={() => setSubTab('running')} icon="progress-clock" />
        <Chip label={t('history') || 'History'} selected={subTab === 'history'} onPress={() => setSubTab('history')} icon="history" />
      </View>

      {filtered.length === 0 ? (
        <EmptyState
          image="empty_box"
          title={subTab === 'running' ? (t('no_running_order') || 'No running orders') : (t('no_history_found') || 'No history yet')}
          subtitle="Place an order to see it here"
          ctaLabel={t('order_now') || 'Order Now'}
          onCta={() => nav.getParent()?.navigate('HomeTab' as any)}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item }) => (
            <OrderRow order={item} onPress={() => nav.navigate('OrderDetail', { orderId: item.id })} />
          )}
        />
      )}
    </View>
  );
}

function OrderRow({ order, onPress }: { order: Order; onPress: () => void }) {
  const statusColor = order.status === 'running' ? colors.warning : order.status === 'delivered' ? colors.success : colors.danger;
  const statusLabel = order.status === 'running' ? 'On the way' : order.status === 'delivered' ? 'Delivered' : 'Cancelled';
  const store = findStore(order.storeName === "La Pino's Pizza" ? 's4' : order.storeName === 'Tasty Fresh' ? 's_tasty' : order.storeName === 'Sai Bakers' ? 's_sai' : order.storeName === 'KFC' ? 's1' : order.storeName === 'Behrouz Biryani' ? 's3' : 's1');

  return (
    <TouchableOpacity onPress={onPress} style={styles.row} activeOpacity={0.9}>
      <FoodImage name={store?.image || 'restaurant_pizza'} style={styles.image} fallbackIcon="food-variant" fallbackIconSize={28} fallbackColor={colors.primary} />
      <View style={{ flex: 1 }}>
        <View style={styles.titleRow}>
          <Text style={styles.storeName} numberOfLines={1}>{order.storeName}</Text>
          <View style={[styles.statusPill, { backgroundColor: statusColor + '22' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
        </View>
        <Text style={styles.orderId}>{order.id}</Text>
        <Text style={styles.preview} numberOfLines={1}>{order.itemsPreview}</Text>
        <View style={styles.metaRow}>
          <Icon name="clock-outline" family="material-community" size={12} color={colors.textSecondary} />
          <Text style={styles.metaText}> {order.date}</Text>
          {order.eta && order.status === 'running' && (
            <Text style={styles.metaText}>  •  ETA {order.eta}</Text>
          )}
        </View>
        <Text style={styles.total}>{inr(order.total)}</Text>
      </View>
      <Icon name="chevron-right" family="material-community" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  subTabsRow: { flexDirection: 'row', paddingHorizontal: 12, paddingTop: 12, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12, ...shadows.sm },
  image: { width: 56, height: 56, borderRadius: 10, backgroundColor: colors.primarySoft },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  storeName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, flex: 1 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontFamily: fontFamilies.bold, fontSize: 10 },
  orderId: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  preview: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary },
  total: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginTop: 6 },
});
