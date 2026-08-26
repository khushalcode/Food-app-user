/**
 * Store detail — hero image, info, menu list.
 * Uses findStore() helper to look up by id across all stores (including s_tasty, s_sai, s_food).
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, PlainHeader, StarRating, VegIndicator, Chip, FoodImage } from '../../components';
import { useCart } from '../../store/cart';
import { findStore, allStores, items, inr, type Item, type Store } from '../../data/mock';

export function StoreDetail() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'StoreDetail'>>();
  const cart = useCart();
  const store: Store = findStore(route.params?.storeId || '') ?? allStores[0];
  const menu = items.filter((i) => i.storeId === store.id);

  return (
    <View style={styles.container}>
      <PlainHeader title={store.name} onBack={() => nav.goBack()} right={
        <TouchableOpacity onPress={() => nav.navigate('Search')}>
          <Icon name="magnify" family="material-community" size={22} color={colors.text} />
        </TouchableOpacity>
      } />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <FoodImage name={store.image} style={styles.heroImage} fallbackIcon="storefront" fallbackIconSize={64} fallbackColor={colors.primary} />
          {store.discount && (
            <View style={styles.heroDiscountBanner}>
              <Icon name="tag" family="material-community" size={14} color={colors.white} />
              <Text style={styles.heroDiscountText}> {store.discount}</Text>
            </View>
          )}
        </View>

        <View style={styles.heroBody}>
          <Text style={styles.heroTitle}>{store.name}</Text>
          <Text style={styles.heroCuisine}>{store.cuisine}</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.ratingPill}>
              <Icon name="star" family="material-community" size={12} color={colors.white} />
              <Text style={styles.ratingText}>{store.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.metaText}>  {store.ratingCount}+ ratings • {store.distanceKm} km away</Text>
          </View>
          <View style={[styles.heroMetaRow, { marginTop: 6 }]}>
            <Icon name="clock-outline" family="material-community" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}> {store.deliveryTime} delivery</Text>
            <Text style={styles.metaText}>  •  {store.deliveryFee === 0 ? 'FREE delivery' : inr(store.deliveryFee) + ' delivery fee'}</Text>
          </View>
          {store.extraDiscount && (
            <View style={styles.extraDiscountBox}>
              <Icon name="tag-heart" family="material-community" size={14} color={colors.primary} />
              <Text style={styles.extraDiscountText}> {store.extraDiscount}</Text>
            </View>
          )}
          {!store.isOpen && (
            <View style={styles.closedBanner}>
              <Icon name="door-closed" family="material-community" size={14} color={colors.danger} />
              <Text style={styles.closedText}> {t('store_is_closed_now') || 'Store is closed now'}</Text>
            </View>
          )}
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}>
          <Chip label="All" selected icon="view-grid-outline" />
          <Chip label="Veg Only" icon="leaf" color={colors.success} />
          <Chip label="Bestseller" icon="crown" color={colors.accent} />
          <Chip label="Offers" icon="tag" />
        </ScrollView>

        {/* Menu */}
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>{menu.length} items on menu</Text>
        </View>
        <View style={{ padding: 12, gap: 12 }}>
          {menu.length === 0 ? (
            <Text style={styles.emptyMenu}>No menu items yet.</Text>
          ) : (
            menu.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                onPress={() => nav.navigate('ItemDetail', { itemId: item.id })}
                qty={cart.state.lines.find((l) => l.item.id === item.id)?.qty || 0}
                onInc={() => cart.add(item, store.id, store.name)}
                onDec={() => cart.setQty(item.id, (cart.state.lines.find((l) => l.item.id === item.id)?.qty || 1) - 1)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItemRow({
  item, onPress, qty, onInc, onDec,
}: {
  item: Item; onPress: () => void; qty: number; onInc: () => void; onDec: () => void;
}) {
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;
  return (
    <View style={styles.menuRow}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', gap: 12, flex: 1 }}>
        <View style={styles.menuImageWrap}>
          <FoodImage name={item.image} style={styles.menuImage} fallbackIcon="food-variant" fallbackIconSize={32} />
          <View style={styles.vegBadge}><VegIndicator veg={item.veg} /></View>
          {item.bestseller && (
            <View style={styles.bestsellerBadge}><Text style={styles.bestsellerText}>★ Bestseller</Text></View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.menuName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.menuDesc} numberOfLines={2}>{item.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{inr(item.price)}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>{inr(item.oldPrice)}</Text>}
            {discount > 0 && <Text style={styles.discountText}>  {discount}% off</Text>}
          </View>
          <View style={[styles.priceRow, { marginTop: 4 }]}>
            <StarRating rating={item.rating} />
            <Text style={styles.metaText}> ({item.ratingCount})</Text>
            {item.prepTime && (
              <>
                <Text style={styles.metaText}>  •  ⏱ {item.prepTime}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
      {qty === 0 ? (
        <Button title="ADD" onPress={onInc} size="sm" style={{ width: 70 }} />
      ) : (
        <View style={styles.qtyStepper}>
          <TouchableOpacity onPress={onDec} style={styles.qtyBtn}><Icon name="minus" family="material-community" size={16} color={colors.primary} /></TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={onInc} style={styles.qtyBtn}><Icon name="plus" family="material-community" size={16} color={colors.primary} /></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.white, ...shadows.sm, position: 'relative' },
  heroImage: { height: 180, backgroundColor: colors.surfaceAlt },
  heroDiscountBanner: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 14 },
  heroDiscountText: { fontFamily: fontFamilies.bold, fontSize: 13, color: colors.white },
  heroBody: { padding: 14 },
  heroTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text },
  heroCuisine: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary, marginTop: 4 },
  heroMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  ratingPill: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },
  metaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  extraDiscountBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: colors.accentSoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  extraDiscountText: { fontFamily: fontFamilies.bold, fontSize: 12, color: colors.primary },
  closedBanner: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: colors.dangerLight, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, alignSelf: 'flex-start' },
  closedText: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.danger },
  menuHeader: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  menuTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  emptyMenu: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, padding: 20, textAlign: 'center' },
  menuRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: colors.white, borderRadius: 12, padding: 12, ...shadows.sm },
  menuImageWrap: { width: 90, height: 90, borderRadius: 10, position: 'relative' },
  menuImage: { width: 90, height: 90, borderRadius: 10, backgroundColor: colors.surfaceAlt },
  vegBadge: { position: 'absolute', top: 4, left: 4, backgroundColor: colors.white, padding: 2, borderRadius: 4 },
  bestsellerBadge: { position: 'absolute', bottom: 4, left: 4, right: 4, backgroundColor: colors.accent, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3 },
  bestsellerText: { fontFamily: fontFamilies.bold, fontSize: 9, color: colors.text, textAlign: 'center' },
  menuName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  menuDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2, lineHeight: 16 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  oldPrice: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textTertiary, textDecorationLine: 'line-through' },
  discountText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.success },
  qtyStepper: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 6, paddingHorizontal: 4, paddingVertical: 2, marginTop: 4 },
  qtyBtn: { padding: 4 },
  qtyText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.primary, minWidth: 20, textAlign: 'center' },
});
