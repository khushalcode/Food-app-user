/**
 * Splash screen — 1.5s, then routes to LanguageSelect.
 */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme/theme';
import { AssetImage } from '../components';

export function Splash() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const t = setTimeout(() => {
      nav.replace('LanguageSelect');
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={styles.container}>
      <AssetImage name="splash" style={{ width: 160, height: 160 }} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
