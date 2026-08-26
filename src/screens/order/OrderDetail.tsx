/**
 * Order detail — full info, itemized list, totals, actions.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OrdersStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Card, Button, StarRating, FoodImage } from '../../components';
import { orders, items, inr } from '../../data/mock';

export function OrderDetail() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();
  const route = useRoute<RouteProp<OrdersStackParamList, 'OrderDetail'>>();
  const order = orders.find((o) => o.id === route.params?.orderId) ?? orders[0];

  // Mock itemized list
  const orderItems = items.slice(0, Math.min(3, items.length)).map((i) => ({ ...i, qty: 1 }));

  return (
    <View style={styles.container}>
      <Header title={order.id} subtitle={order.date} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 100, gap: 12 }}>
        {/* Status banner */}
        <View style={[styles.statusBanner, order.status === 'delivered' && styles.statusDelivered, order.status === 'cancelled' && styles.statusCancelled]}>
          <Icon name={order.status === 'delivered' ? 'check-circle' : order.status === 'cancelled' ? 'close-circle' : 'progress-clock'} family="material-community" size={32} color={colors.white} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.statusTitle}>{order.status === 'delivered' ? 'Delivered' : order.status === 'cancelled' ? 'Cancelled' : 'Running'}</Text>
            <Text style={styles.statusDesc}>{order.status === 'delivered' ? 'Order was delivered successfully' : order.status === 'cancelled' ? 'Order was cancelled' : `Arriving in ${order.eta ?? '15 min'}`}</Text>
          </View>
        </View>

        {/* Items */}
        <Card>
          <Text style={styles.sectionTitle}>{t('order_details') || 'Order Details'}</Text>
          <Text style={styles.storeName}>{order.storeName}</Text>
          {orderItems.map((it, i) => (
            <View key={it.id} style={[styles.itemRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <View style={styles.itemImageWrap}><FoodImage name={it.image} style={styles.itemImage} fallbackIcon="food-variant" fallbackIconSize={20} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName} numberOfLines={1}>{it.name}</Text>
                <Text style={styles.itemMeta}>{inr(it.price)} × {it.qty}</Text>
              </View>
              <Text style={styles.itemTotal}>{inr(it.price * it.qty)}</Text>
            </View>
          ))}
        </Card>

        {/* Bill */}
        <Card>
          <Text style={styles.sectionTitle}>{t('payment_info') || 'Payment Info'}</Text>
          <Row label={t('subtotal') || 'Subtotal'} value={inr(order.total - 20 - Math.round(order.total * 0.05))} />
          <Row label={t('delivery_fee') || 'Delivery Fee'} value={inr(20)} />
          <Row label={t('vat_tax') || 'VAT Tax (5%)'} value={inr(Math.round(order.total * 0.05))} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('total_amount') || 'Total Amount'}</Text>
            <Text style={styles.totalValue}>{inr(order.total)}</Text>
          </View>
        </Card>

        {order.status === 'delivered' && (
          <Card>
            <Text style={styles.sectionTitle}>{t('rate_your_experience') || 'Rate your experience'}</Text>
            <View style={styles.rateRow}>
              {[1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity key={n} style={styles.starBtn}>
                  <Icon name="star-outline" family="material-community" size={32} color={colors.accent} />
                </TouchableOpacity>
              ))}
            </View>
            <Button title="Submit Rating" size="md" style={{ marginTop: 12 }} />
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {order.status === 'delivered' ? (
          <Button title={t('re_order') || 'Re-Order'} onPress={() => nav.navigate('StoreDetail' as any, { storeId: 's1' })} size="lg" fullWidth />
        ) : order.status === 'running' ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title={t('cancel') || 'Cancel'} variant="outline" size="lg" style={{ flex: 1 }} />
            <Button title={t('track_order') || 'Track Order'} size="lg" style={{ flex: 1 }} />
          </View>
        ) : (
          <Button title={t('order_again') || 'Order Again'} onPress={() => nav.navigate('StoreDetail' as any, { storeId: 's1' })} size="lg" fullWidth />
        )}
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.billRow}>
      <Text style={styles.billLabel}>{label}</Text>
      <Text style={styles.billValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  statusBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.warning, borderRadius: 12, padding: 16, ...shadows.md },
  statusDelivered: { backgroundColor: colors.success },
  statusCancelled: { backgroundColor: colors.danger },
  statusTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.white },
  statusDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 8 },
  storeName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.primary, marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  itemImageWrap: { width: 40, height: 40, borderRadius: 8, overflow: 'hidden' },
  itemImage: { width: 40, height: 40, backgroundColor: colors.surfaceAlt },
  itemName: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
  itemMeta: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  itemTotal: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  billLabel: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary },
  billValue: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.divider },
  totalLabel: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  totalValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.primary },
  rateRow: { flexDirection: 'row', gap: 4, justifyContent: 'center' },
  starBtn: { padding: 4 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, ...shadows.lg },
});
