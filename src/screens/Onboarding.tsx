/**
 * Onboarding — 4 swipeable slides matching the language file's on_boarding_* keys.
 */
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { colors, fontFamilies, fontSizes, radii } from '../theme/theme';
import { useTranslation } from '../i18n';
import { Button, AssetImage } from '../components';

const { width } = Dimensions.get('window');

type Slide = {
  image: string;
  titleKey: string;
  descKey: string;
  bg: string;
};

const SLIDES: Slide[] = [
  { image: 'hero_welcome', titleKey: 'on_boarding_1_title', descKey: 'on_boarding_1_description', bg: '#FFF1F3' },
  { image: 'hero_50_off', titleKey: 'on_boarding_2_title', descKey: 'on_boarding_2_description', bg: '#FFF8E1' },
  { image: 'hero_food_delivery', titleKey: 'on_boarding_3_title', descKey: 'on_boarding_3_description', bg: '#E8F5E9' },
  { image: 'hero_grocery', titleKey: 'on_boarding_4_title', descKey: 'on_boarding_4_description', bg: '#E3F2FD' },
];

export function Onboarding() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<any>(null);

  const onScroll = (e: any) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    setIdx(i);
  };

  const goNext = () => {
    if (idx < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (idx + 1) * width, animated: true });
    } else {
      nav.replace('SignIn');
    }
  };

  const skip = () => nav.replace('SignIn');

  return (
    <View style={styles.container}>
      <View style={styles.skipWrap}>
        {idx < SLIDES.length - 1 && (
          <TouchableOpacity onPress={skip} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.skip}>{t('skip') || 'Skip'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.slider}
      >
        {SLIDES.map((s, i) => (
          <View key={i} style={[styles.slide, { backgroundColor: s.bg }]}>
            <View style={styles.imageWrap}>
              <AssetImage name={s.image} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{t(s.titleKey)}</Text>
            <Text style={styles.desc}>{t(s.descKey)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, idx === i && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={idx === SLIDES.length - 1 ? (t('get_started') || 'Get Started') : (t('next') || 'Next')}
          onPress={goNext}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  skipWrap: { paddingHorizontal: 20, paddingVertical: 12, alignItems: 'flex-end' },
  skip: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.primary },
  slider: { flex: 1 },
  slide: { width, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  imageWrap: { width: width * 0.7, height: width * 0.7, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  title: {
    fontFamily: fontFamilies.bold, fontSize: fontSizes.title, color: colors.text,
    textAlign: 'center', marginTop: 32, marginBottom: 12,
  },
  desc: {
    fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22,
  },
  dots: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { width: 24, backgroundColor: colors.primary },
  footer: { padding: 20, paddingBottom: 32 },
});
