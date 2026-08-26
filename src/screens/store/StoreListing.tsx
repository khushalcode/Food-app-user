/**
 * Store listing — vertical list of restaurants with the Swiggy-style image-led card.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Chip, EmptyState, FoodImage } from '../../components';
import { allStores, inr, type Store } from '../../data/mock';

export function StoreListing() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'StoreListing'>>();
  const category = route.params?.category;
  const title = route.params?.title || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Restaurants');
  const [filter, setFilter] = useState<'all' | 'open' | 'pureVeg' | 'fast'>('all');

  let filtered = allStores;
  if (category) {
    // Match by cuisine containing the category name OR items in that category (simplified)
    const catNames: Record<string, string[]> = {
      pizza: ['Pizza', 'Italian'],
      biryani: ['Biryani', 'Mughlai'],
      burger: ['Burger', 'American', 'Fried Chicken'],
      momos: ['Momos', 'Bakery'],
      dosa: ['Dosa', 'South Indian'],
      north_indian: ['North Indian', 'Thali', 'Punjabi', 'Mughlai'],
      chinese: ['Chinese'],
      dessert: ['Desserts', 'Bakery', 'Ice Cream', 'Sweets'],
      south_indian: ['South Indian', 'Dosa'],
      rolls: ['Rolls', 'Fast Food'],
      chaat: ['Chaat', 'Snacks', 'Street Food'],
      healthy: ['Healthy'],
    };
    const matchTerms = catNames[category] || [category];
    filtered = filtered.filter((s) => matchTerms.some((term) => s.cuisine.toLowerCase().includes(term.toLowerCase())));
  }
  if (filter === 'open') filtered = filtered.filter((s) => s.isOpen);
  if (filter === 'pureVeg') filtered = filtered.filter((s) => s.tags?.includes('Pure Veg'));
  if (filter === 'fast') filtered = filtered.filter((s) => parseInt(s.deliveryTime) <= 25);

  return (
    <View style={styles.container}>
      <Header title={title} subtitle={`${filtered.length} restaurants`} onBack={() => nav.goBack()} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}>
        <Chip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} icon="view-grid-outline" />
        <Chip label="Open Now" selected={filter === 'open'} onPress={() => setFilter('open')} icon="door-open" />
        <Chip label="Pure Veg" selected={filter === 'pureVeg'} onPress={() => setFilter('pureVeg')} icon="leaf" color={colors.success} />
        <Chip label="Fast Delivery" selected={filter === 'fast'} onPress={() => setFilter('fast')} icon="bike-fast" color={colors.info} />
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState title={t('no_store_available') || 'No store available'} subtitle="Try a different filter" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(s) => s.id}
          contentContainerStyle={{ padding: 12, gap: 14 }}
          renderItem={({ item }) => (
            <StoreRow store={item} onPress={() => nav.navigate('StoreDetail', { storeId: item.id })} />
          )}
        />
      )}
    </View>
  );
}

function StoreRow({ store, onPress }: { store: Store; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        <FoodImage name={store.image} style={styles.image} fallbackIcon="storefront" fallbackIconSize={56} fallbackColor={colors.primaryLight} />
        {store.discount && (
          <View style={styles.discountPill}>
            <Text style={styles.discountText}>{store.discount}</Text>
          </View>
        )}
        {store.tags?.includes('Pure Veg') && (
          <View style={styles.vegPill}><Text style={styles.vegPillText}>PURE VEG</Text></View>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>{store.rating.toFixed(1)} ★</Text>
          </View>
        </View>
        <Text style={styles.cuisine} numberOfLines={1}>{store.cuisine}</Text>
        <View style={styles.metaRow}>
          <Icon name="clock-outline" family="material-community" size={12} color={colors.textSecondary} />
          <Text style={styles.metaText}> {store.deliveryTime}</Text>
          <Text style={styles.metaDot}>  •  </Text>
          <Icon name="map-marker" family="material-community" size={12} color={colors.textSecondary} />
          <Text style={styles.metaText}> {store.distanceKm} km</Text>
          <Text style={styles.metaDot}>  •  </Text>
          <Text style={styles.metaText}>{store.deliveryFee === 0 ? 'FREE Delivery' : inr(store.deliveryFee) + ' delivery'}</Text>
        </View>
        {store.extraDiscount && (
          <View style={styles.extraRow}>
            <Icon name="tag-heart" family="material-community" size={12} color={colors.primary} />
            <Text style={styles.extraText}> {store.extraDiscount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  imageWrap: { position: 'relative' },
  image: { height: 160, backgroundColor: colors.surfaceAlt },
  discountPill: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 12 },
  discountText: { fontFamily: fontFamilies.bold, fontSize: 13, color: colors.white },
  vegPill: { position: 'absolute', top: 10, right: 10, backgroundColor: colors.success, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  vegPillText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  body: { padding: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  storeName: { flex: 1, fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text },
  ratingPill: { backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },
  cuisine: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' },
  metaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  metaDot: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textTertiary },
  extraRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, padding: 8, backgroundColor: colors.accentSoft, borderRadius: 6 },
  extraText: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text },
});
