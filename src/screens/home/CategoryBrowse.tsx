/**
 * Category Browse — grocery-style grid of food categories with real photos.
 * Tap a category to see all restaurants serving that cuisine.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon } from '../../components';
import { categories } from '../../data/mock';
import { getFoodImage } from '../../utils/foodAssetMap';

const { width } = Dimensions.get('window');
const COLS = 3;
const TILE = (width - 16 * 2 - 12 * (COLS - 1)) / COLS;

export function CategoryBrowse() {
  const nav = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View style={styles.container}>
      <Header title="Browse by Category" subtitle={`${categories.length} cuisines`} onBack={() => nav.goBack()} />
      <FlatList
        data={categories}
        keyExtractor={(c) => c.id}
        numColumns={COLS}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const img = getFoodImage(item.image || '');
          return (
            <TouchableOpacity
              onPress={() => nav.navigate('StoreListing', { category: item.id, title: item.name })}
              style={styles.tile}
              activeOpacity={0.9}
            >
              {img && (
                <Image source={img} style={styles.tileImage} resizeMode="cover" />
              )}
              <View style={styles.tileOverlay} />
              <View style={styles.tileBody}>
                <Text style={styles.tileName}>{item.name}</Text>
                <Text style={styles.tileCount}>Explore →</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    ...shadows.sm,
  },
  tileImage: { width: '100%', height: '100%' },
  tileOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
  tileBody: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 },
  tileName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.white },
  tileCount: { fontFamily: fontFamilies.medium, fontSize: 10, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
});
