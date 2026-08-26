/**
 * Wishlist — favorited items.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, EmptyState, StarRating, VegIndicator, Button, FoodImage } from '../../components';
import { useCart } from '../../store/cart';
import { bestReviewed, inr } from '../../data/mock';

const { width } = Dimensions.get('window');

export function Wishlist() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const cart = useCart();
  const items = bestReviewed.slice(0, 6);

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Header title={t('wishlist') || 'Wishlist'} onBack={() => nav.goBack()} />
        <EmptyState image="empty_box" title="Your wishlist is empty" subtitle="Tap the heart on any item to save it" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={t('wishlist') || 'Wishlist'} subtitle={`${items.length} items`} onBack={() => nav.goBack()} />
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => nav.getParent()?.navigate('HomeTab' as any, { screen: 'ItemDetail', params: { itemId: item.id } } as any)}>
              <View style={styles.imageWrap}>
                <FoodImage name={item.image} style={styles.image} fallbackIcon="food-variant" fallbackIconSize={32} />
                <View style={styles.vegBadge}><VegIndicator veg={item.veg} /></View>
                <TouchableOpacity style={styles.heartBtn}><Icon name="heart" family="material-community" size={16} color={colors.primary} /></TouchableOpacity>
              </View>
              <View style={{ padding: 8 }}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.store} numberOfLines={1}>{item.storeName}</Text>
                <View style={styles.metaRow}><StarRating rating={item.rating} /></View>
                <Text style={styles.price}>{inr(item.price)}</Text>
              </View>
            </TouchableOpacity>
            <Button title="ADD" onPress={() => cart.add(item, item.storeName, item.storeName)} size="sm" style={{ marginHorizontal: 8, marginBottom: 8 }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { flex: 1, backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  imageWrap: { position: 'relative' },
  image: { height: 110, backgroundColor: colors.surfaceAlt },
  vegBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: colors.white, padding: 2, borderRadius: 4 },
  heartBtn: { position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text },
  store: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginTop: 4 },
});
