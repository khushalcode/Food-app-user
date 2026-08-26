/**
 * Home — Rich Swiggy/Zomato-style food discovery.
 *
 * Sections (top to bottom):
 * 1. Location header + search bar + bell
 * 2. Hero carousel — "ITEMS AT 50% OFF" + "FREE DELIVERY" + "WELCOME"
 * 3. "What's on your mind?" — category circles with real food photos
 * 4. "Explore More" — Offers / Top 10 / Pure Veg / Under 30 min / Browse All
 * 5. "In The Spotlight" — featured restaurant with real banner
 * 6. "Top Picks for You" — horizontal item carousel
 * 7. "Free Delivery" — restaurants with 0 delivery fee
 * 8. "Trending Now" — most-rated items
 * 9. "Newly Launched" — newest restaurants
 * 10. "Bestsellers" — horizontal item carousel
 * 11. "Gourmet / Premium" — high-rated restaurants
 * 12. Filter chips bar
 * 13. "856 restaurants delivering to you" — main restaurant feed
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Image, ImageSourcePropType, RefreshControl, Animated, Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, radii, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import {
  Button, Icon, Card, StarRating, VegIndicator, Chip, FoodImage,
  FadeIn, Pressable, Shimmer, ShimmerCard, BounceIn, Pulse, SpringScale, showToast,
} from '../../components';
import { useCart } from '../../store/cart';
import { getFoodImage } from '../../utils/foodAssetMap';
import {
  categories, allStores, stores, popular, bestsellers, fastDelivery, pureVegStores,
  spotlight, offers, items, inr, type Store, type Item,
} from '../../data/mock';

const { width } = Dimensions.get('window');

export function Home() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cart = useCart();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast('Updated with latest restaurants', 'success', 'check-circle');
    }, 1200);
  }, []);

  const freeDeliveryStores = allStores.filter((s) => s.deliveryFee === 0);
  const newlyLaunched = allStores.slice(8, 14);
  const gourmet = [...allStores].filter((s) => s.rating >= 4.2).slice(0, 6);
  const trendingItems = [...items].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 8);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
            titleColor={colors.primary}
            title="Pull to refresh"
          />
        }
      >
        {/* 1. Top header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.locationBtn}>
              <Icon name="map-marker" family="material-community" size={18} color={colors.primary} />
              <View style={{ marginLeft: 6, flex: 1 }}>
                <Text style={styles.locationLabel}>{t('deliver_to') || 'DELIVER TO'}</Text>
                <Text style={styles.locationValue} numberOfLines={1}>Home • Barwala Garden</Text>
              </View>
              <Icon name="chevron-down" family="material-community" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellBtn}>
              <Icon name="bell-outline" family="material-community" size={22} color={colors.text} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchBar} onPress={() => nav.navigate('Search')}>
            <Icon name="magnify" family="material-community" size={20} color={colors.textTertiary} />
            <Text style={styles.searchPlaceholder}>Restaurant name or dish...</Text>
            <View style={styles.micBtn}>
              <Icon name="microphone" family="material-community" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {loading ? (
          /* Loading shimmer state — shown for 900ms on mount and during refresh */
          <View style={{ padding: 16, gap: 16 }}>
            <Shimmer width="100%" height={180} radius={16} />
            <View style={{ flexDirection: 'row', gap: 14, justifyContent: 'space-around' }}>
              {[1,2,3,4].map((i) => (
                <View key={i} style={{ alignItems: 'center', gap: 6 }}>
                  <Shimmer width={64} height={64} radius={32} />
                  <Shimmer width={50} height={11} />
                </View>
              ))}
            </View>
            <Shimmer width="60%" height={20} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <ShimmerCard width={168} />
              <ShimmerCard width={168} />
            </View>
            <Shimmer width="50%" height={20} />
            <ShimmerCard />
            <ShimmerCard />
          </View>
        ) : (
        <>
        {/* 2. Hero carousel — 3 banners */}
        <FadeIn delay={100}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12 }}
          snapToInterval={width - 24}
          decelerationRate="fast"
        >
          <HeroBanner
            image="hero_50_off"
            tag="LIMITED TIME"
            title="ITEMS AT 50% OFF"
            subtitle="Order from your favourite restaurants"
            cta="Order Now"
            color={colors.primary}
            onPress={() => nav.navigate('SpecialOffers')}
          />
          <HeroBanner
            image="hero_food_delivery"
            tag="FREE DELIVERY"
            title="FREE DELIVERY"
            subtitle="On orders above ₹149 • No fees, no kidding"
            cta="See restaurants"
            color={colors.success}
            onPress={() => nav.navigate('CuratedList', { type: 'fast' })}
          />
          <HeroBanner
            image="hero_welcome"
            tag="WELCOME OFFER"
            title="₹150 OFF"
            subtitle="On your first 3 orders. Use code WELCOME50"
            cta="Claim now"
            color={colors.accentDark}
            onPress={() => nav.navigate('SpecialOffers')}
          />
        </ScrollView>

        {/* 3. "What's on your mind?" — categories with real photos */}
        <SectionHeader title={t('categories') || "What's on your mind?"} onSeeAll={() => nav.navigate('CategoryBrowse')} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(c) => c.id}
          contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 8 }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => nav.navigate('StoreListing', { category: item.id, title: item.name })}
                style={styles.catTile}
              >
                <FoodImage name={item.image || ''} style={styles.catImage} fallbackIcon={item.icon} fallbackIconSize={28} fallbackColor={item.color} />
                <Text style={styles.catLabel} numberOfLines={2}>{item.name}</Text>
              </Pressable>
            );
          }}
        />

        {/* 4. Explore More tiles */}
        <SectionHeader title="Explore More" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, gap: 10 }}>
          <ExploreTile icon="tag-multiple" label="Offers" color={colors.primary} onPress={() => nav.navigate('SpecialOffers')} />
          <ExploreTile icon="crown" label="Top 10" color={colors.accentDark} onPress={() => nav.navigate('CuratedList', { type: 'top10' })} />
          <ExploreTile icon="leaf" label="Pure Veg" color={colors.success} onPress={() => nav.navigate('CuratedList', { type: 'veg' })} />
          <ExploreTile icon="bike-fast" label="Under 30 min" color={colors.info} onPress={() => nav.navigate('CuratedList', { type: 'fast' })} />
          <ExploreTile icon="star-shooting" label="Best Rated" color="#7C3AED" onPress={() => nav.navigate('CuratedList', { type: 'spotlight' })} />
          <ExploreTile icon="apps" label="Browse All" color={colors.textSecondary} onPress={() => nav.navigate('CategoryBrowse')} />
        </ScrollView>

        {/* 5. In The Spotlight */}
        <SectionHeader title="In The Spotlight" />
        <SpotlightCard store={spotlight} onPress={() => nav.navigate('StoreDetail', { storeId: spotlight.id })} />

        {/* 6. Top Picks for You */}
        <SectionHeader title="Top Picks for You" onSeeAll={() => nav.navigate('SpecialOffers')} />
        <ItemCarousel items={bestsellers} onPressItem={(id) => nav.navigate('ItemDetail', { itemId: id })} onAdd={(item) => cart.add(item, item.storeId, item.storeName)} />

        {/* 7. Free Delivery restaurants */}
        <SectionHeader title="Free Delivery" subtitle="₹0 delivery fee" onSeeAll={() => nav.navigate('CuratedList', { type: 'fast' })} />
        <StoreCarousel stores={freeDeliveryStores} onPress={(id) => nav.navigate('StoreDetail', { storeId: id })} />

        {/* 8. Trending Now */}
        <SectionHeader title="Trending Now" subtitle="Most ordered this week" onSeeAll={() => nav.navigate('Search')} />
        <ItemCarousel items={trendingItems} onPressItem={(id) => nav.navigate('ItemDetail', { itemId: id })} onAdd={(item) => cart.add(item, item.storeId, item.storeName)} />

        {/* 9. Newly Launched */}
        <SectionHeader title="Newly Launched" subtitle="Fresh on BlinkSy Food" onSeeAll={() => nav.navigate('StoreListing', { title: 'Newly Launched' })} />
        <StoreCarousel stores={newlyLaunched} onPress={(id) => nav.navigate('StoreDetail', { storeId: id })} />

        {/* 10. Bestsellers */}
        <SectionHeader title="Bestsellers" onSeeAll={() => nav.navigate('SpecialOffers')} />
        <ItemCarousel items={bestsellers} onPressItem={(id) => nav.navigate('ItemDetail', { itemId: id })} onAdd={(item) => cart.add(item, item.storeId, item.storeName)} />

        {/* 11. Gourmet / Premium */}
        <SectionHeader title="Gourmet & Premium" subtitle="Top-rated restaurants" onSeeAll={() => nav.navigate('CuratedList', { type: 'top10' })} />
        <StoreCarousel stores={gourmet} onPress={(id) => nav.navigate('StoreDetail', { storeId: id })} />

        {/* 12. Filter chips */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>856 restaurants delivering to you</Text>
            <Text style={styles.sectionSubtitle}>Delivery in 30-40 min</Text>
          </View>
          <TouchableOpacity onPress={() => nav.navigate('StoreListing', { title: 'All Restaurants' })}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12, gap: 8 }}>
          <Chip label="Filters" icon="tune-vertical" onPress={() => nav.navigate('Search')} />
          <Chip label="Sort by" icon="sort-variant" onPress={() => nav.navigate('Search')} />
          <Chip label="Near & Fast" icon="bike-fast" onPress={() => nav.navigate('CuratedList', { type: 'fast' })} />
          <Chip label="Rating 4.0+" icon="star" onPress={() => nav.navigate('Search')} />
          <Chip label="Pure Veg" icon="leaf" onPress={() => nav.navigate('CuratedList', { type: 'veg' })} />
          <Chip label="Offers" icon="tag" onPress={() => nav.navigate('SpecialOffers')} />
        </ScrollView>

        {/* 13. Restaurant feed */}
        <View style={styles.feedList}>
          {allStores.map((store) => (
            <RestaurantCard
              key={store.id}
              store={store}
              onPress={() => nav.navigate('StoreDetail', { storeId: store.id })}
            />
          ))}
        </View>
        </FadeIn>
        </>
        )}
      </ScrollView>

      {/* Floating cart pill — slides in from bottom when items added */}
      {cart.count > 0 && (
        <BounceIn>
        <Pressable onPress={() => nav.navigate('Cart')} style={styles.cartPill}>
          <View style={styles.cartPillLeft}>
            <View style={styles.cartPillCount}>
              <Text style={styles.cartPillCountText}>{cart.count}</Text>
            </View>
            <Text style={styles.cartPillLabel}>{cart.state.storeName ?? (t('my_cart') || 'My Cart')}</Text>
          </View>
          <View style={styles.cartPillRight}>
            <Text style={styles.cartPillTotal}>{inr(cart.subtotal)}</Text>
            <Icon name="arrow-right" family="feather" size={18} color={colors.white} />
          </View>
        </Pressable>
        </BounceIn>
      )}
    </View>
  );
}

/* ---------- Sub components ---------- */

function SectionHeader({ title, subtitle, onSeeAll }: { title: string; subtitle?: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function HeroBanner({ image, tag, title, subtitle, cta, color, onPress }: { image: string; tag: string; title: string; subtitle: string; cta: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.heroBanner, { backgroundColor: color, width: width - 24 }]}>
      <FoodImage name={image} style={styles.heroBgImage} fallbackIcon="food-variant" fallbackIconSize={40} fallbackColor="rgba(255,255,255,0.3)" />
      <View style={styles.heroOverlay} />
      <View style={styles.heroContent}>
        <View style={styles.heroTagWrap}>
          <Text style={styles.heroTag}>{tag}</Text>
        </View>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>
        <View style={[styles.heroCta, { backgroundColor: colors.white }]}>
          <Text style={[styles.heroCtaText, { color: color }]}>{cta}</Text>
          <Icon name="arrow-right" family="feather" size={14} color={color} />
        </View>
      </View>
    </Pressable>
  );
}

function ExploreTile({ icon, label, color, onPress }: { icon: string; label: string; color: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.exploreTile}>
      <View style={[styles.exploreIcon, { backgroundColor: color + '22' }]}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <Text style={styles.exploreLabel}>{label}</Text>
    </Pressable>
  );
}

function SpotlightCard({ store, onPress }: { store: Store; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.spotlightCard}>
      <View style={styles.spotlightImageWrap}>
        <FoodImage name={store.image} style={styles.spotlightImage} fallbackIcon="storefront" fallbackIconSize={48} fallbackColor={colors.primary} />
        <View style={styles.spotlightGradient} />
        <View style={styles.spotlightBadge}>
          <Icon name="star" family="material-community" size={12} color={colors.accent} />
          <Text style={styles.spotlightBadgeText}>FEATURED</Text>
          <Pulse size={6} color={colors.accent} style={{ marginLeft: 4 }} />
        </View>
        <View style={styles.spotlightInfo}>
          <Text style={styles.spotlightName}>{store.name}</Text>
          <Text style={styles.spotlightCuisine}>{store.cuisine}</Text>
          <View style={styles.spotlightMetaRow}>
            <View style={styles.ratingPillGreen}>
              <Icon name="star" family="material-community" size={11} color={colors.white} />
              <Text style={styles.ratingPillText}>{store.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.spotlightMetaText}>  {store.deliveryTime} • {store.distanceKm} km</Text>
          </View>
          {store.discount && (
            <View style={styles.discountBanner}>
              <Icon name="tag" family="material-community" size={12} color={colors.white} />
              <Text style={styles.discountText}> {store.discount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

function ItemCarousel({ items: itemList, onPressItem, onAdd }: { items: Item[]; onPressItem: (id: string) => void; onAdd: (item: Item) => void }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={itemList}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 4 }}
      renderItem={({ item }) => {
        const discount = item.oldPrice ? Math.round((1 - item.price / item.oldPrice) * 100) : 0;
        return (
          <Pressable onPress={() => onPressItem(item.id)} style={styles.itemCard}>
            <View style={styles.itemImageWrap}>
              <FoodImage name={item.image} style={styles.itemImage} fallbackIcon="food-variant" fallbackIconSize={32} />
              <View style={styles.vegBadge}><VegIndicator veg={item.veg} /></View>
              {discount > 0 && <View style={styles.offerBadge}><Text style={styles.offerBadgeText}>{discount}% OFF</Text></View>}
            </View>
            <View style={{ padding: 8 }}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemStore} numberOfLines={1}>{item.storeName}</Text>
              <View style={styles.itemMetaRow}>
                <StarRating rating={item.rating} />
                <Text style={styles.itemMetaText}> ({item.ratingCount})</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{inr(item.price)}</Text>
                {item.oldPrice && <Text style={styles.oldPrice}>{inr(item.oldPrice)}</Text>}
              </View>
              <Button title="ADD" onPress={() => { onAdd(item); showToast(`${item.name} added to cart`, 'success', 'cart-check'); }} size="sm" style={{ marginTop: 4 }} />
            </View>
          </Pressable>
        );
      }}
    />
  );
}

function StoreCarousel({ stores: storeList, onPress }: { stores: Store[]; onPress: (id: string) => void }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={storeList}
      keyExtractor={(s) => s.id}
      contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 4 }}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => onPress(item.id)} style={styles.storeCardMini}>
            <View style={styles.storeImageMiniWrap}>
              <FoodImage name={item.image} style={styles.storeImageMini} fallbackIcon="storefront" fallbackIconSize={28} fallbackColor={colors.primary} />
              {item.discount && (
                <View style={styles.storeDiscountStrip}>
                  <Text style={styles.storeDiscountText} numberOfLines={1}>{item.discount}</Text>
                </View>
              )}
            </View>
            <View style={{ padding: 8 }}>
              <Text style={styles.storeNameMini} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.storeCuisineMini} numberOfLines={1}>{item.cuisine}</Text>
              <View style={styles.storeMetaRow}>
                <View style={styles.ratingPillGreen}><Text style={styles.ratingPillText}>{item.rating.toFixed(1)} ★</Text></View>
                <Text style={styles.storeMetaTextMini}>  {item.deliveryTime}</Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

function RestaurantCard({ store, onPress }: { store: Store; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.restaurantCard}>
      <View style={styles.restaurantImageWrap}>
        <FoodImage name={store.image} style={styles.restaurantImage} fallbackIcon="storefront" fallbackIconSize={56} fallbackColor={colors.primaryLight} />
        {store.discount && (
          <View style={styles.imageDiscountPill}>
            <Text style={styles.imageDiscountText}>{store.discount}</Text>
          </View>
        )}
        {store.tags?.includes('Pure Veg') && (
          <View style={styles.vegPill}><Text style={styles.vegPillText}>PURE VEG</Text></View>
        )}
      </View>

      <View style={styles.restaurantBody}>
        <View style={styles.restaurantTitleRow}>
          <Text style={styles.restaurantName} numberOfLines={1}>{store.name}</Text>
          <View style={styles.ratingPillGreen}>
            <Text style={styles.ratingPillText}>{store.rating.toFixed(1)} ★</Text>
          </View>
        </View>
        <Text style={styles.restaurantCuisine} numberOfLines={1}>{store.cuisine}</Text>
        <View style={styles.restaurantMetaRow}>
          <Icon name="clock-outline" family="material-community" size={12} color={colors.textSecondary} />
          <Text style={styles.restaurantMetaText}> {store.deliveryTime}</Text>
          <Text style={styles.restaurantMetaDot}>  •  </Text>
          <Icon name="map-marker" family="material-community" size={12} color={colors.textSecondary} />
          <Text style={styles.restaurantMetaText}> {store.distanceKm} km</Text>
          <Text style={styles.restaurantMetaDot}>  •  </Text>
          <Text style={styles.restaurantMetaText}>{store.deliveryFee === 0 ? 'FREE Delivery' : inr(store.deliveryFee) + ' delivery'}</Text>
        </View>
        {store.extraDiscount && (
          <View style={styles.extraDiscountRow}>
            <Icon name="tag-heart" family="material-community" size={12} color={colors.primary} />
            <Text style={styles.extraDiscountText}> {store.extraDiscount}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: { backgroundColor: colors.white, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.divider },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  locationBtn: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  locationLabel: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.textSecondary, letterSpacing: 1 },
  locationValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginTop: 2 },
  bellBtn: { position: 'relative', padding: 6 },
  bellDot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  searchPlaceholder: { flex: 1, marginLeft: 8, fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textTertiary },
  micBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },

  heroBanner: { height: 180, borderRadius: 16, overflow: 'hidden', marginRight: 12, ...shadows.md, position: 'relative' },
  heroBgImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.35 },
  heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' },
  heroContent: { position: 'absolute', inset: 0, padding: 20, justifyContent: 'center' },
  heroTagWrap: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 8 },
  heroTag: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white, letterSpacing: 2 },
  heroTitle: { fontFamily: fontFamilies.black, fontSize: 32, color: colors.white, lineHeight: 36 },
  heroSubtitle: { fontFamily: fontFamilies.regular, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  heroCta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  heroCtaText: { fontFamily: fontFamilies.bold, fontSize: 13 },

  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 22, marginBottom: 10 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text },
  sectionSubtitle: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  seeAll: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.primary },

  catTile: { alignItems: 'center', marginRight: 14, width: 76 },
  catImage: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.white, ...shadows.sm },
  catIconWrap: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  catLabel: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text, marginTop: 6, textAlign: 'center' },

  exploreTile: { alignItems: 'center', width: 80 },
  exploreIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  exploreLabel: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text, marginTop: 6, textAlign: 'center' },

  spotlightCard: { marginHorizontal: 12, backgroundColor: colors.white, borderRadius: 16, overflow: 'hidden', ...shadows.md },
  spotlightImageWrap: { height: 200, position: 'relative' },
  spotlightImage: { width: '100%', height: '100%' },
  spotlightImagePlaceholder: { height: '100%', backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  spotlightGradient: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' },
  spotlightBadge: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.text, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  spotlightBadgeText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.accent, letterSpacing: 1 },
  spotlightInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  spotlightName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.white },
  spotlightCuisine: { fontFamily: fontFamilies.regular, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  spotlightMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  spotlightMetaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  discountBanner: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, alignSelf: 'flex-start' },
  discountText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },

  ratingPillGreen: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  ratingPillText: { fontFamily: fontFamilies.bold, fontSize: 11, color: colors.white },

  itemCard: { width: 168, backgroundColor: colors.white, borderRadius: 12, marginRight: 12, ...shadows.sm, overflow: 'hidden' },
  itemImageWrap: { height: 120, position: 'relative' },
  itemImage: { width: '100%', height: '100%' },
  itemImagePlaceholder: { height: '100%', backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  vegBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: colors.white, padding: 2, borderRadius: 4 },
  offerBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  offerBadgeText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  itemName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.text },
  itemStore: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  itemMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemMetaText: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 6 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  oldPrice: { fontFamily: fontFamilies.regular, fontSize: fontSizes.xs, color: colors.textTertiary, textDecorationLine: 'line-through' },

  storeCardMini: { width: 220, backgroundColor: colors.white, borderRadius: 12, marginRight: 12, ...shadows.sm, overflow: 'hidden' },
  storeImageMiniWrap: { height: 110, position: 'relative' },
  storeImageMini: { width: '100%', height: '100%' },
  storeImagePlaceholder: { height: '100%', backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  storeDiscountStrip: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, paddingVertical: 4, paddingHorizontal: 8 },
  storeDiscountText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  storeNameMini: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  storeCuisineMini: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  storeMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  storeMetaTextMini: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary },

  feedList: { paddingHorizontal: 12, gap: 14, paddingTop: 4 },
  restaurantCard: { backgroundColor: colors.white, borderRadius: 12, overflow: 'hidden', ...shadows.sm },
  restaurantImageWrap: { position: 'relative' },
  restaurantImage: { width: '100%', height: 180 },
  restaurantImagePlaceholder: { height: 160, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  imageDiscountPill: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 12 },
  imageDiscountText: { fontFamily: fontFamilies.bold, fontSize: 13, color: colors.white },
  vegPill: { position: 'absolute', top: 10, right: 10, backgroundColor: colors.success, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  vegPillText: { fontFamily: fontFamilies.bold, fontSize: 10, color: colors.white },
  restaurantBody: { padding: 12 },
  restaurantTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  restaurantName: { flex: 1, fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text },
  restaurantCuisine: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  restaurantMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, flexWrap: 'wrap' },
  restaurantMetaText: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary },
  restaurantMetaDot: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textTertiary },
  extraDiscountRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, padding: 8, backgroundColor: colors.accentSoft, borderRadius: 6 },
  extraDiscountText: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text },

  cartPill: {
    position: 'absolute', bottom: 16, left: 16, right: 16,
    backgroundColor: colors.primary, borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    ...shadows.lg,
  },
  cartPillLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  cartPillCount: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cartPillCountText: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.white },
  cartPillLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.white, flex: 1 },
  cartPillRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cartPillTotal: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.white },
});
