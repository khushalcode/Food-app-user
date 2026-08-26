/**
 * Special Offers — grid of discounted items.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Button, Icon, StarRating, VegIndicator, FoodImage } from '../../components';
import { useCart } from '../../store/cart';
import { offers, inr, type Item } from '../../data/mock';

export function SpecialOffers() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cart = useCart();

  return (
    <View style={styles.container}>
      <Header title={`${t('offer') || 'Special Offer'} (${offers.length})`} onBack={() => nav.goBack()} />
      <FlatList
        data={offers}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => <OfferGrid item={item} onPress={() => nav.navigate('ItemDetail', { itemId: item.id })} onAdd={() => cart.add(item, item.storeId, item.storeName)} />}
      />
    </View>
  );
}

function OfferGrid({ item, onPress, onAdd }: { item: Item; onPress: () => void; onAdd: () => void }) {
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageWrap}>
          <FoodImage name={item.image} style={styles.image} fallbackIcon="food-variant" fallbackIconSize={40} />
          <View style={styles.vegBadge}><VegIndicator veg={item.veg} /></View>
          <View style={styles.offerBadge}><Text style={styles.offerBadgeText}>{discount}% OFF</Text></View>
        </View>
        <View style={{ padding: 8 }}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.store} numberOfLines={1}>{item.storeName}</Text>
          <View style={styles.metaRow}><StarRating rating={item.rating} /></View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{inr(item.price)}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>{inr(item.oldPrice)}</Text>}
          </View>
        </View>
      </TouchableOpacity>
      <Button title="ADD" onPress={onAdd} size="sm" style={{ marginHorizontal: 8, marginBottom: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { flex: 1, backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  imageWrap: { position: 'relative' },
  image: { height: 120, backgroundColor: colors.surfaceAlt },
  vegBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: colors.white, padding: 2, borderRadius: 4 },
  offerBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  offerBadgeText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  name: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text },
  store: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  oldPrice: { fontFamily: fontFamilies.regular, fontSize: fontSizes.xs, color: colors.textTertiary, textDecorationLine: 'line-through' },
});
