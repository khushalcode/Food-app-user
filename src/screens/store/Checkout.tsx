/**
 * Checkout — address select, payment method, place order.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, Header, Card, showToast } from '../../components';
import { useCart } from '../../store/cart';
import { addresses, inr } from '../../data/mock';

const PAYMENTS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash-multiple', desc: 'Pay after receiving the item' },
  { id: 'wallet', label: 'Wallet Payment', icon: 'wallet', desc: 'Use BlinkSy Money balance' },
  { id: 'digital', label: 'Digital Payment', icon: 'credit-card', desc: 'UPI / Card / Netbanking' },
];

export function Checkout() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cart = useCart();
  const [payment, setPayment] = useState('cod');
  const [placing, setPlacing] = useState(false);

  const addr = addresses[0];
  const subtotal = cart.subtotal;
  const deliveryFee = 20;
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + vat;

  const place = () => {
    setPlacing(true);
    showToast('Placing your order...', 'info', 'progress-clock');
    setTimeout(() => {
      cart.clear();
      setPlacing(false);
      showToast('Order placed successfully! 🎉', 'success', 'check-circle');
      nav.replace('OrderTracking', { orderId: 'ORD-7842' });
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Header title={t('checkout') || 'Checkout'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 120, gap: 12 }}>
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('delivery_address') || 'Delivery Address'}</Text>
            <TouchableOpacity><Text style={styles.changeBtn}>{t('change') || 'Change'}</Text></TouchableOpacity>
          </View>
          <View style={styles.addressRow}>
            <Icon name="map-marker" family="material-community" size={22} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.addressLabel}>{addr.label} • {addr.contactName}</Text>
              <Text style={styles.addressText}>{addr.address}, {addr.city} - {addr.pincode}</Text>
              <Text style={styles.addressPhone}>{addr.phone}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('choose_payment_method') || 'Choose Payment Method'}</Text>
          {PAYMENTS.map((p) => (
            <TouchableOpacity key={p.id} onPress={() => setPayment(p.id)} style={[styles.paymentRow, payment === p.id && styles.paymentRowActive]}>
              <View style={[styles.radio, payment === p.id && styles.radioActive]}>
                {payment === p.id && <View style={styles.radioInner} />}
              </View>
              <Icon name={p.icon} family="material-community" size={22} color={colors.text} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.paymentTitle}>{p.label}</Text>
                <Text style={styles.paymentDesc}>{p.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('payment_info') || 'Payment Info'}</Text>
          <Row label={t('subtotal') || 'Subtotal'} value={inr(subtotal)} />
          <Row label={t('vat_tax') || 'VAT Tax (5%)'} value={inr(vat)} />
          <Row label={t('delivery_fee') || 'Delivery Fee'} value={inr(deliveryFee)} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('total_amount') || 'Total Amount'}</Text>
            <Text style={styles.totalValue}>{inr(total)}</Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>{t('total') || 'Total'}</Text>
          <Text style={styles.footerTotal}>{inr(total)}</Text>
        </View>
        <Button title={placing ? 'Placing...' : (t('place_order') || 'Place Order')} onPress={place} loading={placing} size="lg" style={{ flex: 1, marginLeft: 16 }} />
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  changeBtn: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.primary },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start' },
  addressLabel: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  addressText: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  addressPhone: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.text, marginTop: 4 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderWidth: 1.5, borderColor: 'transparent', borderRadius: 8, paddingHorizontal: 4 },
  paymentRowActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft, paddingHorizontal: 8 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  radioActive: { borderColor: colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  paymentTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  paymentDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  billLabel: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary },
  billValue: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.divider },
  totalLabel: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  totalValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, flexDirection: 'row', alignItems: 'center', ...shadows.lg },
  footerTotalLabel: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary },
  footerTotal: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text },
});
