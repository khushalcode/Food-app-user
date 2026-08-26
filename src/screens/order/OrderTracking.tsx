/**
 * Order tracking — animated progress stepper + driver info.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, Header, Card, StarRating, AssetImage, FadeIn, SpringScale, Pulse, BounceIn } from '../../components';
import { orders, inr } from '../../data/mock';

const STEPS = [
  { id: 'placed', title: 'Order Placed', desc: 'We received your order', icon: 'cart-check' },
  { id: 'preparing', title: 'Preparing', desc: 'Store is preparing your food', icon: 'chef-hat' },
  { id: 'pickup', title: 'Out for Delivery', desc: 'Driver picked up your order', icon: 'bike-fast' },
  { id: 'delivered', title: 'Delivered', desc: 'Order arrived at your address', icon: 'check-circle' },
];

export function OrderTracking() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'OrderTracking'>>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const order = orders.find((o) => o.id === route.params?.orderId) ?? orders[0];

  return (
    <View style={styles.container}>
      <Header title={t('order_tracking') || 'Order Tracking'} subtitle={order.id} onBack={() => nav.navigate('Home')} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 100, gap: 12 }}>
        {/* ETA banner */}
        <SpringScale delay={100}>
        <View style={styles.etaBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.etaTitle}>Arriving in {order.eta ?? '15 min'}</Text>
            <Text style={styles.etaSubtitle}>Driver is on the way to your location</Text>
          </View>
          <Icon name="bike-fast" family="material-community" size={48} color={colors.white} />
        </View>
        </SpringScale>

        {/* Map placeholder */}
        <FadeIn delay={200}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" family="material-community" size={48} color={colors.textTertiary} />
          <Text style={styles.mapPlaceholderText}>Live map preview</Text>
          <Pulse size={8} color={colors.primary} style={{ marginTop: 6 }} />
        </View>
        </FadeIn>

        {/* Progress stepper */}
        <Card>
          <Text style={styles.sectionTitle}>{t('track_order') || 'Track Order'}</Text>
          {STEPS.map((s, i) => {
            const done = i <= step;
            const active = i === step;
            return (
              <View key={s.id} style={[styles.stepRow, i === STEPS.length - 1 && { paddingBottom: 0 }]}>
                <View style={styles.stepLeft}>
                  <View style={[styles.stepIcon, done && styles.stepIconDone, active && styles.stepIconActive]}>
                    <Icon name={s.icon} family="material-community" size={18} color={done ? colors.white : colors.textTertiary} />
                  </View>
                  {i < STEPS.length - 1 && <View style={[styles.stepLine, done && styles.stepLineDone]} />}
                </View>
                <View style={{ flex: 1, paddingBottom: 18 }}>
                  <Text style={[styles.stepTitle, !done && styles.stepTitlePending]}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                </View>
              </View>
            );
          })}
        </Card>

        {/* Driver info */}
        <Card>
          <Text style={styles.sectionTitle}>{t('assigned_driver') || 'Assigned Driver'}</Text>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Icon name="account" family="material-community" size={28} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.driverName}>{order.driver ?? 'Ramesh K.'}</Text>
              <View style={styles.driverMeta}>
                <StarRating rating={4.6} />
                <Text style={styles.driverMetaText}>  •  2.3 km away</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callBtn}><Icon name="phone" family="material-community" size={18} color={colors.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.chatBtn}><Icon name="chat-processing-outline" family="material-community" size={18} color={colors.primary} /></TouchableOpacity>
          </View>
        </Card>

        {/* Order summary */}
        <Card>
          <Text style={styles.sectionTitle}>{t('order_details') || 'Order Details'}</Text>
          <Text style={styles.orderStore}>{order.storeName}</Text>
          <Text style={styles.orderItemsPreview}>{order.itemsPreview}</Text>
          <View style={styles.orderMetaRow}>
            <Text style={styles.orderMetaLabel}>Order ID</Text>
            <Text style={styles.orderMetaValue}>{order.id}</Text>
          </View>
          <View style={styles.orderMetaRow}>
            <Text style={styles.orderMetaLabel}>Total</Text>
            <Text style={styles.orderMetaValue}>{inr(order.total)}</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  etaBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, padding: 16, ...shadows.md },
  etaTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.white },
  etaSubtitle: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  mapPlaceholder: { height: 180, backgroundColor: colors.surfaceAlt, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 6 },
  mapPlaceholderText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textTertiary },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  stepRow: { flexDirection: 'row' },
  stepLeft: { width: 36, alignItems: 'center' },
  stepIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  stepIconDone: { backgroundColor: colors.success },
  stepIconActive: { backgroundColor: colors.primary },
  stepLine: { width: 2, flex: 1, backgroundColor: colors.border, marginTop: 4, marginBottom: 4, minHeight: 24 },
  stepLineDone: { backgroundColor: colors.success },
  stepTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  stepTitlePending: { color: colors.textTertiary },
  stepDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  driverAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  driverName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  driverMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  driverMetaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  callBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center' },
  chatBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  orderStore: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  orderItemsPreview: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4, marginBottom: 8 },
  orderMetaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  orderMetaLabel: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  orderMetaValue: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.text },
});
