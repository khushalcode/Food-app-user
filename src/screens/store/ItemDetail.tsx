/**
 * Item detail — large image, description, qty stepper, addons, add-to-cart.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, PlainHeader, StarRating, VegIndicator, Card, FoodImage, FadeIn, SpringScale, showToast } from '../../components';
import { useCart } from '../../store/cart';
import { items, inr } from '../../data/mock';

const ADDONS = [
  { id: 'extra-cheese', name: 'Extra Cheese', price: 30 },
  { id: 'extra-sauce', name: 'Extra Sauce', price: 15 },
  { id: 'combo-drink', name: 'Add Soft Drink', price: 50 },
];

export function ItemDetail() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'ItemDetail'>>();
  const cart = useCart();
  const item = items.find((i) => i.id === route.params?.itemId) ?? items[0];
  const [qty, setQty] = useState(cart.state.lines.find((l) => l.item.id === item.id)?.qty || 1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const addonTotal = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = (item.price + addonTotal) * qty;

  const addToCart = () => {
    for (let i = 0; i < qty; i++) cart.add(item, item.storeName, item.storeName);
    showToast(`${qty} × ${item.name} added to cart`, 'success', 'cart-check');
    nav.navigate('Cart');
  };

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  return (
    <View style={styles.container}>
      <PlainHeader onBack={() => nav.goBack()} right={<TouchableOpacity onPress={() => nav.navigate('Cart')}><Icon name="cart-outline" family="material-community" size={24} color={colors.text} /></TouchableOpacity>} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imageWrap}>
          <FoodImage name={item.image} style={styles.imageContent} fallbackIcon="food-variant" fallbackIconSize={80} />
          <View style={styles.vegBadge}><VegIndicator veg={item.veg} size={18} /></View>
        </View>

        <FadeIn delay={200} distance={30}>
        <View style={styles.body}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.metaRow}>
            <StarRating rating={item.rating} size={14} />
            <Text style={styles.metaText}>  {item.ratingCount}+ ratings</Text>
          </View>
          <Text style={styles.storeName}>by <Text style={{ color: colors.primary }}>{item.storeName}</Text></Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{inr(item.price)}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>{inr(item.oldPrice)}</Text>}
            {item.oldPrice && <Text style={styles.discount}>{Math.round((1 - item.price / item.oldPrice) * 100)}% OFF</Text>}
          </View>

          {item.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('description') || 'Description'}</Text>
              <Text style={styles.sectionText}>{item.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('addons') || 'Addons'}</Text>
            {ADDONS.map((a) => {
              const active = selectedAddons.includes(a.id);
              return (
                <TouchableOpacity key={a.id} onPress={() => toggleAddon(a.id)} style={styles.addonRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={[styles.addonCheckbox, active && styles.addonCheckboxActive]}>
                      {active && <Icon name="check" family="material-community" size={14} color={colors.white} />}
                    </View>
                    <Text style={styles.addonName}>{a.name}</Text>
                  </View>
                  <Text style={styles.addonPrice}>+{inr(a.price)}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('quantity') || 'Quantity'}</Text>
            <View style={styles.qtyStepper}>
              <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}><Icon name="minus" family="material-community" size={20} color={colors.primary} /></TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}><Icon name="plus" family="material-community" size={20} color={colors.primary} /></TouchableOpacity>
            </View>
          </View>
        </View>
        </FadeIn>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>{t('total_amount') || 'Total Amount'}</Text>
          <Text style={styles.footerTotal}>{inr(total)}</Text>
        </View>
        <Button title={t('add_to_cart') || 'Add to Cart'} onPress={addToCart} size="lg" style={{ flex: 1, marginLeft: 16 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  imageWrap: { height: 240, backgroundColor: colors.surfaceAlt, position: 'relative' },
  imageContent: { width: '100%', height: '100%' },
  vegBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: colors.white, padding: 4, borderRadius: 6 },
  body: { backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: -16, padding: 16 },
  name: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxxl, color: colors.text },
  storeName: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  metaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.divider },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text },
  oldPrice: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textTertiary, textDecorationLine: 'line-through' },
  discount: { fontFamily: fontFamilies.bold, fontSize: 12, color: colors.success, backgroundColor: colors.successLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  section: { marginTop: 18 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 8 },
  sectionText: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary, lineHeight: 22 },
  addonRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.divider },
  addonCheckbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  addonCheckboxActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  addonName: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
  addonPrice: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  qtyStepper: { flexDirection: 'row', alignItems: 'center', gap: 24, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  qtyBtn: { padding: 8 },
  qtyText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.primary, minWidth: 24, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, flexDirection: 'row', alignItems: 'center', ...shadows.lg },
  footerTotalLabel: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary },
  footerTotal: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text },
});
