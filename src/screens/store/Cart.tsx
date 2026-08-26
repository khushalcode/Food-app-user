/**
 * Cart — list of items with qty steppers, promo code, delivery option, totals.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, Header, EmptyState, VegIndicator, Card, FoodImage, showToast, FadeIn } from '../../components';
import { useCart } from '../../store/cart';
import { coupons, inr } from '../../data/mock';

export function Cart() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cart = useCart();
  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<'home' | 'takeaway'>('home');

  if (cart.state.lines.length === 0) {
    return (
      <View style={styles.container}>
        <Header title={t('my_cart') || 'My Cart'} onBack={() => nav.goBack()} />
        <EmptyState
          image="empty_cart"
          title={t('cart_is_empty') || 'Your cart is empty'}
          subtitle="Browse stores and add your favourite items"
          ctaLabel={t('order_now') || 'Order Now'}
          onCta={() => nav.navigate('Home')}
        />
      </View>
    );
  }

  const subtotal = cart.subtotal;
  const deliveryFee = deliveryOption === 'home' ? 20 : 0;
  const discount = appliedPromo ? 50 : 0;
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + vat - discount;

  const applyPromo = () => {
    const valid = coupons.find((c) => c.code.toLowerCase() === promo.toLowerCase() && subtotal >= c.minOrder);
    if (valid) {
      setAppliedPromo(valid.code);
      showToast(`Coupon ${valid.code} applied — you saved ₹50!`, 'success', 'ticket-confirmation');
    } else {
      showToast('Invalid coupon or minimum order not met', 'error', 'alert-circle');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('my_cart') || 'My Cart'} subtitle={`${cart.count} items • ${cart.state.storeName ?? ''}`} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 120, gap: 12 }}>
        {/* Cart lines */}
        <Card padding={0}>
          {cart.state.lines.map((line, i) => (
            <View key={line.item.id} style={[styles.lineRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <View style={styles.lineImageWrap}>
                <FoodImage name={line.item.image} style={styles.lineImage} fallbackIcon="food-variant" fallbackIconSize={22} />
                <View style={styles.vegBadge}><VegIndicator veg={line.item.veg} /></View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.lineName} numberOfLines={1}>{line.item.name}</Text>
                <Text style={styles.lineStore} numberOfLines={1}>{line.item.storeName}</Text>
                <Text style={styles.linePrice}>{inr(line.item.price)}</Text>
              </View>
              <View style={styles.qtyStepper}>
                <TouchableOpacity onPress={() => cart.setQty(line.item.id, line.qty - 1)} style={styles.qtyBtn}><Icon name="minus" family="material-community" size={14} color={colors.primary} /></TouchableOpacity>
                <Text style={styles.qtyText}>{line.qty}</Text>
                <TouchableOpacity onPress={() => cart.setQty(line.item.id, line.qty + 1)} style={styles.qtyBtn}><Icon name="plus" family="material-community" size={14} color={colors.primary} /></TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>

        {/* Delivery option */}
        <Card>
          <Text style={styles.sectionTitle}>{t('delivery_option') || 'Delivery Option'}</Text>
          <TouchableOpacity onPress={() => setDeliveryOption('home')} style={styles.optionRow}>
            <View style={[styles.radio, deliveryOption === 'home' && styles.radioActive]} />
            <Icon name="bike-fast" family="material-community" size={20} color={colors.primary} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.optionTitle}>{t('home_delivery') || 'Home Delivery'}</Text>
              <Text style={styles.optionDesc}>Arrives in ~30 min • ₹20 fee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeliveryOption('takeaway')} style={styles.optionRow}>
            <View style={[styles.radio, deliveryOption === 'takeaway' && styles.radioActive]} />
            <Icon name="shopping" family="material-community" size={20} color={colors.textSecondary} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.optionTitle}>{t('take_away') || 'Take Away'}</Text>
              <Text style={styles.optionDesc}>Pick up yourself • No fee</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* Promo */}
        <Card>
          <Text style={styles.sectionTitle}>{t('enter_promo_code') || 'Enter Promo Code'}</Text>
          <View style={styles.promoRow}>
            <Icon name="ticket-confirmation" family="material-community" size={20} color={colors.textSecondary} />
            <RNTextInput
              value={promo}
              onChangeText={setPromo}
              placeholder="WELCOME50"
              placeholderTextColor={colors.textTertiary}
              style={{ flex: 1, marginLeft: 8, fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text, padding: 0 }}
            />
            <Button title={appliedPromo ? 'Applied' : (t('apply') || 'Apply')} onPress={applyPromo} size="sm" variant={appliedPromo ? 'success' : 'primary'} disabled={!!appliedPromo || !promo} />
          </View>
          {appliedPromo && <Text style={styles.promoSuccess}>✓ {appliedPromo} applied — you saved {inr(50)}</Text>}
        </Card>

        {/* Bill */}
        <Card>
          <Text style={styles.sectionTitle}>{t('payment_info') || 'Payment Info'}</Text>
          <Row label={t('item_price') || 'Item Price'} value={inr(subtotal)} />
          <Row label={t('vat_tax') || 'VAT Tax (5%)'} value={inr(vat)} />
          {discount > 0 && <Row label={t('coupon_discount') || 'Coupon Discount'} value={`- ${inr(discount)}`} color={colors.success} />}
          <Row label={t('delivery_fee') || 'Delivery Fee'} value={deliveryFee === 0 ? 'FREE' : inr(deliveryFee)} color={deliveryFee === 0 ? colors.success : colors.text} />
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
        <Button title={t('place_order') || 'Place Order'} onPress={() => nav.navigate('Checkout')} size="lg" style={{ flex: 1, marginLeft: 16 }} />
      </View>
    </View>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <View style={styles.billRow}>
      <Text style={styles.billLabel}>{label}</Text>
      <Text style={[styles.billValue, color ? { color } : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  lineRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  lineImageWrap: { width: 56, height: 56, borderRadius: 10, position: 'relative' },
  lineImage: { width: 56, height: 56, borderRadius: 10, backgroundColor: colors.surfaceAlt },
  vegBadge: { position: 'absolute', top: 2, left: 2, backgroundColor: colors.white, padding: 1, borderRadius: 3 },
  lineName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  lineStore: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  linePrice: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text, marginTop: 4 },
  qtyStepper: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 6, paddingHorizontal: 4, paddingVertical: 2 },
  qtyBtn: { padding: 4 },
  qtyText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.primary, minWidth: 18, textAlign: 'center' },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, marginRight: 10 },
  radioActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  optionTitle: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
  optionDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  promoRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  promoSuccess: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.success, marginTop: 8 },
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
