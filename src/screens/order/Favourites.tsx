/**
 * Favourites — tab on bottom nav. Empty-state by default.
 */
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, EmptyState, Chip, Icon, FoodImage } from '../../components';
import { bestReviewed } from '../../data/mock';
import { useState } from 'react';

export function Favourites() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [tab, setTab] = useState<'items' | 'stores'>('items');

  // Demo: show bestReviewed as "favourites"
  return (
    <View style={styles.container}>
      <Header title={t('favorite') || 'Favourite'} showBack={false} />
      <View style={styles.tabsRow}>
        <Chip label="Restaurants" selected={tab === 'stores'} onPress={() => setTab('stores')} />
        <Chip label="Items" selected={tab === 'items'} onPress={() => setTab('items')} />
      </View>
      {bestReviewed.length === 0 ? (
        <EmptyState
          image="empty_box"
          title="No favourites yet"
          subtitle="Tap the heart icon on items or stores to save them"
          ctaLabel="Browse stores"
          onCta={() => nav.navigate('Home')}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
          {bestReviewed.map((i) => (
            <TouchableOpacity key={i.id} style={styles.row} onPress={() => nav.navigate('ItemDetail', { itemId: i.id })}>
              <FoodImage name={i.image} style={styles.image} fallbackIcon="food-variant" fallbackIconSize={24} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name} numberOfLines={1}>{i.name}</Text>
                <Text style={styles.store} numberOfLines={1}>{i.storeName}</Text>
                <Text style={styles.price}>₹{i.price}</Text>
              </View>
              <TouchableOpacity style={styles.heartBtn}><Icon name="heart" family="material-community" size={20} color={colors.primary} /></TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabsRow: { flexDirection: 'row', paddingHorizontal: 12, paddingTop: 12, gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12 },
  image: { width: 60, height: 60, borderRadius: 10, backgroundColor: colors.primarySoft },
  imagePlaceholder: { width: 60, height: 60, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  store: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  price: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.primary, marginTop: 4 },
  heartBtn: { padding: 8 },
});
