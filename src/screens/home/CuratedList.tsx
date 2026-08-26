/**
 * Curated List — for "Deliveries under 30 min", "Pure Veg", "Top 10", "In The Spotlight", "Offers".
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { Header, Icon, EmptyState, Chip, FoodImage } from '../../components';
import { allStores, fastDelivery, pureVegStores, spotlight, offers, bestsellers, inr, type Store } from '../../data/mock';

const TITLES: Record<string, string> = {
  fast: 'Deliveries under 30 minutes',
  veg: 'Pure Veg Restaurants',
  top10: 'Top 10 Restaurants',
  spotlight: 'In The Spotlight',
  offers: 'Restaurants with Offers',
};

export function CuratedList() {
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'CuratedList'>>();
  const type = route.params?.type ?? 'fast';

  let stores: Store[] = [];
  let subtitle = '';
  switch (type) {
    case 'fast':
      stores = fastDelivery;
      subtitle = `${stores.length} restaurants • Fastest delivery`;
      break;
    case 'veg':
      stores = pureVegStores;
      subtitle = `${stores.length} pure veg restaurants`;
      break;
    case 'top10':
      stores = [...allStores].sort((a, b) => b.rating - a.rating).slice(0, 10);
      subtitle = `Top rated • ${stores.length} restaurants`;
      break;
    case 'spotlight':
      stores = [spotlight];
      subtitle = 'Featured restaurant';
      break;
    case 'offers':
      stores = allStores.filter((s) => s.discount);
      subtitle = `${stores.length} restaurants with active offers`;
      break;
  }

  return (
    <View style={styles.container}>
      <Header title={TITLES[type]} subtitle={subtitle} onBack={() => nav.goBack()} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['Sort by', 'Rating 4.0+', 'Pure Veg', 'Fast Delivery', 'Offers']}
        keyExtractor={(i) => i}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}
        renderItem={({ item }) => <Chip label={item} icon="tune-vertical" onPress={() => {}} />}
      />
      {stores.length === 0 ? (
        <EmptyState title="No restaurants found" subtitle="Try a different filter" />
      ) : (
        <FlatList
          data={stores}
          keyExtractor={(s) => s.id}
          contentContainerStyle={{ padding: 12, gap: 14 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => nav.navigate('StoreDetail', { storeId: item.id })} style={styles.restaurantCard} activeOpacity={0.9}>
              <View style={styles.imageWrap}>
                <FoodImage name={item.image} style={styles.image} fallbackIcon="storefront" fallbackIconSize={48} fallbackColor={colors.primaryLight} />
                {item.discount && (
                  <View style={styles.discountPill}><Text style={styles.discountText}>{item.discount}</Text></View>
                )}
                {item.tags?.includes('Pure Veg') && (
                  <View style={styles.vegPill}><Text style={styles.vegPillText}>PURE VEG</Text></View>
                )}
              </View>
              <View style={styles.body}>
                <View style={styles.titleRow}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingPill}><Text style={styles.ratingText}>{item.rating.toFixed(1)} ★</Text></View>
                </View>
                <Text style={styles.cuisine} numberOfLines={1}>{item.cuisine}</Text>
                <View style={styles.metaRow}>
                  <Icon name="clock-outline" family="material-community" size={12} color={colors.textSecondary} />
                  <Text style={styles.metaText}> {item.deliveryTime}</Text>
                  <Text style={styles.metaDot}>  •  </Text>
                  <Icon name="map-marker" family="material-community" size={12} color={colors.textSecondary} />
                  <Text style={styles.metaText}> {item.distanceKm} km</Text>
                </View>
                {item.extraDiscount && (
                  <View style={styles.extraRow}>
                    <Icon name="tag-heart" family="material-community" size={12} color={colors.primary} />
                    <Text style={styles.extraText}> {item.extraDiscount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  restaurantCard: { backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  imageWrap: { position: 'relative' },
  image: { height: 150, backgroundColor: colors.surfaceAlt },
  discountPill: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 12 },
  discountText: { fontFamily: fontFamilies.bold, fontSize: 13, color: colors.white },
  vegPill: { position: 'absolute', top: 10, right: 10, backgroundColor: colors.success, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  vegPillText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  body: { padding: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  name: { flex: 1, fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text },
  ratingPill: { backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },
  cuisine: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  metaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  metaDot: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textTertiary },
  extraRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, padding: 8, backgroundColor: colors.accentSoft, borderRadius: 6 },
  extraText: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text },
});
