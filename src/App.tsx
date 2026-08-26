import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { ActivityIndicator, View, StyleSheet, Animated, Easing } from 'react-native';
import { colors, fontFamilies } from './theme/theme';
import { RootNavigator } from './navigation';
import { CartProvider } from './store/cart';
import { loadLang } from './i18n';
import { AssetImage, ToastContainer } from './components';

function SplashScreen() {
  return (
    <View style={styles.splash}>
      <AnimatedSplashLogo />
      <ActivityIndicator size="large" color={colors.white} style={{ marginTop: 24 }} />
    </View>
  );
}

/** Animated splash logo — fades in + scales up on mount. */
function AnimatedSplashLogo() {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.8)).current;
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
    ]).start();
  }, [opacity, scale]);
  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <AssetImage name="logo" style={{ width: 240, height: 64 }} resizeMode="contain" />
    </Animated.View>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          Font.loadAsync({
            [fontFamilies.regular]: require('../assets/fonts/Roboto-Regular.ttf'),
            [fontFamilies.medium]: require('../assets/fonts/Roboto-Medium.ttf'),
            [fontFamilies.bold]: require('../assets/fonts/Roboto-Bold.ttf'),
            [fontFamilies.black]: require('../assets/fonts/Roboto-Black.ttf'),
          }),
          Asset.loadAsync([require('../assets/images/splash.png'), require('../assets/images/logo.png')]),
          loadLang(),
        ]);
      } catch (e) {
        console.warn('App boot error:', e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <StatusBar style="light" />
        <SplashScreen />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <CartProvider>
          <RootNavigator />
          <ToastContainer />
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
