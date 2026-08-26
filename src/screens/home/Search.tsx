/**
 * Search — query input, VEG toggle, filter chips, restaurant + item results.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput as RNTextInput, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, Icon, Header, Skeleton, EmptyState, StarRating, VegIndicator, Chip, FoodImage } from '../../components';
import { useCart } from '../../store/cart';
import { items, allStores, findStore, inr, type Item } from '../../data/mock';

const { width } = Dimensions.get('window');

export function Search() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'Search'>>();
  const cart = useCart();
  const [query, setQuery] = useState(route.params?.query || '');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Item[]>([]);
  const [storeResults, setStoreResults] = useState<typeof allStores>([]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const q = query.toLowerCase().trim();
      let r = items;
      let s = allStores;
      if (q) {
        r = r.filter((i) => i.name.toLowerCase().includes(q) || i.storeName.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
        s = s.filter((st) => st.name.toLowerCase().includes(q) || st.cuisine.toLowerCase().includes(q));
      }
      if (activeFilter) r = r.filter((i) => i.category === activeFilter);
      if (vegOnly) {
        r = r.filter((i) => i.veg);
        s = s.filter((st) => st.tags?.includes('Pure Veg'));
      }
      setResults(r);
      setStoreResults(s);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [query, activeFilter, vegOnly]);

  const filters = [
    { id: 'pizza', label: 'Pizza' },
    { id: 'biryani', label: 'Biryani' },
    { id: 'burger', label: 'Burger' },
    { id: 'momos', label: 'Momos' },
    { id: 'dosa', label: 'Dosa' },
    { id: 'north_indian', label: 'Thali' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'rolls', label: 'Rolls' },
    { id: 'chaat', label: 'Chaat' },
  ];

  return (
    <View style={styles.container}>
      <Header
        title={t('search') || 'Search'}
        onBack={() => nav.goBack()}
        right={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity><Icon name="tune-vertical" family="material-community" size={22} color={colors.white} /></TouchableOpacity>
            <TouchableOpacity><Icon name="sort-variant" family="material-community" size={22} color={colors.white} /></TouchableOpacity>
          </View>
        }
      />

      {/* Search bar + VEG toggle */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Icon name="magnify" family="material-community" size={20} color={colors.textSecondary} />
          <RNTextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Restaurant name or dish..."
            placeholderTextColor={colors.textTertiary}
            style={{ flex: 1, marginLeft: 8, fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.text, padding: 0 }}
            returnKeyType="search"
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close-circle" family="material-community" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setVegOnly(!vegOnly)} style={[styles.vegToggle, vegOnly && styles.vegToggleActive]}>
          <Text style={[styles.vegToggleText, vegOnly && styles.vegToggleTextActive]}>VEG</Text>
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        keyExtractor={(f) => f.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}
        renderItem={({ item }) => (
          <Chip label={item.label} selected={activeFilter === item.id} onPress={() => setActiveFilter(activeFilter === item.id ? '' : item.id)} />
        )}
      />

      {/* Results */}
      {loading ? (
        <FlatList
          data={Array.from({ length: 6 })}
          keyExtractor={(_, i) => `s${i}`}
          numColumns={2}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={() => (
            <View style={styles.gridCard}>
              <Skeleton width="100%" height={120} radius={0} />
              <View style={{ padding: 8, gap: 6 }}>
                <Skeleton width="70%" height={14} />
                <Skeleton width="50%" height={11} />
                <Skeleton width="40%" height={12} />
                <Skeleton width="100%" height={32} radius={6} />
              </View>
            </View>
          )}
        />
      ) : results.length === 0 && storeResults.length === 0 ? (
        <EmptyState
          title={t('no_data_found') || 'No items found'}
          subtitle="Try a different keyword or category"
          ctaLabel="Clear search"
          onCta={() => { setQuery(''); setActiveFilter(''); setVegOnly(false); }}
        />
      ) : (
        <FlatList
          data={[{ type: 'stores', data: storeResults }, { type: 'items', data: results }]}
          keyExtractor={(section, i) => `${section.type}-${i}`}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item: section }) => {
            if (section.type === 'stores' && storeResults.length > 0) {
              return (
                <View>
                  <Text style={styles.sectionLabel}>RESTAURANTS ({storeResults.length})</Text>
                  {storeResults.map((st) => (
                    <TouchableOpacity key={st.id} onPress={() => nav.navigate('StoreDetail', { storeId: st.id })} style={styles.storeRow}>
                      <FoodImage name={st.image} style={styles.storeImage} fallbackIcon="storefront" fallbackIconSize={26} fallbackColor={colors.primary} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.storeName} numberOfLines={1}>{st.name}</Text>
                        <Text style={styles.storeCuisine} numberOfLines={1}>{st.cuisine}</Text>
                        <View style={styles.storeMetaRow}>
                          <View style={styles.ratingPill}><Text style={styles.ratingText}>{st.rating.toFixed(1)} ★</Text></View>
                          <Text style={styles.storeMetaText}>  {st.deliveryTime} • {st.distanceKm} km</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            }
            if (section.type === 'items' && results.length > 0) {
              return (
                <View>
                  <Text style={styles.sectionLabel}>DISHES ({results.length})</Text>
                  <View style={styles.grid}>
                    {results.map((it) => (
                      <SearchItemCard
                        key={it.id}
                        item={it}
                        onPress={() => nav.navigate('ItemDetail', { itemId: it.id })}
                        onAdd={() => cart.add(it, it.storeId, it.storeName)}
                      />
                    ))}
                  </View>
                </View>
              );
            }
            return null;
          }}
        />
      )}
    </View>
  );
}

function SearchItemCard({ item, onPress, onAdd }: { item: Item; onPress: () => void; onAdd: () => void }) {
  const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;
  return (
    <View style={styles.gridCard}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.gridImageWrap}>
          <FoodImage name={item.image} style={styles.gridImage} fallbackIcon="food-variant" fallbackIconSize={36} />
          <View style={styles.vegBadge}><VegIndicator veg={item.veg} /></View>
          {discount > 0 && <View style={styles.offerBadge}><Text style={styles.offerBadgeText}>{discount}% OFF</Text></View>}
        </View>
        <View style={{ padding: 8 }}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemStore} numberOfLines={1}>{item.storeName}</Text>
          <View style={styles.itemMetaRow}>
            <StarRating rating={item.rating} />
          </View>
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
  searchRow: { flexDirection: 'row', paddingHorizontal: 12, paddingTop: 12, gap: 8, alignItems: 'center' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 10, paddingHorizontal: 12, height: 44, ...shadows.sm },
  vegToggle: { width: 56, height: 44, borderRadius: 10, borderWidth: 2, borderColor: colors.success, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  vegToggleActive: { backgroundColor: colors.success },
  vegToggleText: { fontFamily: fontFamilies.bold, fontSize: 12, color: colors.success },
  vegToggleTextActive: { color: colors.white },
  sectionLabel: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.textSecondary, letterSpacing: 1, marginBottom: 8, marginTop: 8 },
  storeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12, marginBottom: 8, ...shadows.sm },
  storeImage: { width: 56, height: 56, borderRadius: 10, backgroundColor: colors.primarySoft },
  storeName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  storeCuisine: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  storeMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingPill: { backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },
  storeMetaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridCard: { flex: 1, minWidth: (width - 36) / 2, maxWidth: (width - 36) / 2, backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  gridImageWrap: { height: 120, backgroundColor: colors.surfaceAlt, position: 'relative' },
  gridImage: { height: 120, backgroundColor: colors.surfaceAlt },
  vegBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: colors.white, padding: 2, borderRadius: 4 },
  offerBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  offerBadgeText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  itemName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text },
  itemStore: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  itemMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  oldPrice: { fontFamily: fontFamilies.regular, fontSize: fontSizes.xs, color: colors.textTertiary, textDecorationLine: 'line-through' },
});
