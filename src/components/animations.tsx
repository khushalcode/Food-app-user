/**
 * BlinkSy Food — Animation primitives.
 * Built on React Native's built-in Animated API (no extra deps, no babel plugins).
 *
 * Components:
 * - Pressable      — TouchableOpacity replacement with scale-down on press
 * - FadeIn         — fades + slides up on mount
 * - Stagger        — staggers fade-in of children
 * - Shimmer        — animated gradient sweep for loading states
 * - Pulse          — pulsing dot for "live" indicators
 * - AnimatedCounter— counts up to a number
 * - HeartButton    — animated heart fill
 * - SpringScale    — spring-based scale animation on mount
 * - SlideInFromBottom — slides in from bottom (for sheets, toasts)
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  StyleProp,
  LayoutChangeEvent,
  Dimensions,
  ImageStyle,
  Pressable as RNPressable,
} from 'react-native';
import { colors, fontFamilies, fontSizes, shadows, radii } from '../theme/theme';
import { Icon } from './index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ============ Pressable — scale down on press ============ */

type PressableProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  scale?: number;          // how much to scale down on press (0.96 = 4% shrink)
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  delayPressIn?: number;
};

export function Pressable({
  children,
  onPress,
  style,
  activeOpacity = 0.9,
  scale = 0.96,
  disabled = false,
  hitSlop,
  delayPressIn = 0,
}: PressableProps) {
  const anim = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.timing(anim, {
      toValue: scale,
      duration: 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [anim, scale]);

  const onPressOut = useCallback(() => {
    Animated.spring(anim, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [anim]);

  return (
    <Animated.View style={[{ transform: [{ scale: anim }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={activeOpacity}
        disabled={disabled}
        hitSlop={hitSlop}
        delayPressIn={delayPressIn}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ============ FadeIn — fade + slide up on mount ============ */

export function FadeIn({
  children,
  delay = 0,
  duration = 400,
  distance = 24,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(t);
  }, [delay, duration, opacity, translateY]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

/* ============ Stagger — stagger fade-in of children ============ */

export function Stagger({
  children,
  staggerDelay = 80,
  initialDelay = 0,
  duration = 350,
  distance = 20,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  distance?: number;
}) {
  const [items, setItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Extract children into an array
    const childArray = React.Children.toArray(children);
    setItems(childArray);
  }, [children]);

  return (
    <View>
      {items.map((child, i) => (
        <FadeIn key={i} delay={initialDelay + i * staggerDelay} duration={duration} distance={distance}>
          {child}
        </FadeIn>
      ))}
    </View>
  );
}

/* ============ Shimmer — animated gradient sweep ============ */

export function Shimmer({
  width = '100%',
  height = 16,
  radius = 6,
  style,
}: {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: 2,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [translateX]);

  return (
    <View
      style={[
        {
          width: width as any,
          height: height as any,
          backgroundColor: colors.surfaceAlt,
          borderRadius: radius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '50%',
          backgroundColor: 'rgba(255,255,255,0.5)',
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [-1, 2],
                outputRange: [-SCREEN_WIDTH * 0.5, SCREEN_WIDTH],
              }),
            },
          ],
        }}
      />
    </View>
  );
}

/* ============ ShimmerCard — full skeleton card with shimmer ============ */

export function ShimmerCard({ width: cardWidth }: { width?: number }) {
  return (
    <View style={[styles.shimmerCard, cardWidth ? { width: cardWidth } : null]}>
      <Shimmer width="100%" height={120} radius={0} />
      <View style={{ padding: 8, gap: 6 }}>
        <Shimmer width="70%" height={14} />
        <Shimmer width="50%" height={11} />
        <Shimmer width="40%" height={12} />
        <Shimmer width="100%" height={32} radius={6} />
      </View>
    </View>
  );
}

/* ============ Pulse — pulsing dot indicator ============ */

export function Pulse({
  size = 8,
  color = colors.success,
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 2.2,
          duration: 1200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale, opacity]);

  return (
    <View style={[{ width: size, height: size, position: 'relative' }, style]}>
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ scale }],
        }}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/* ============ AnimatedCounter — counts up to a number ============ */

export function AnimatedCounter({
  value,
  duration = 800,
  style,
  prefix = '',
  suffix = '',
}: {
  value: number;
  duration?: number;
  style?: StyleProp<TextStyle>;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    const listener = anim.addListener(({ value: v }) => {
      setDisplayValue(Math.round(v));
    });
    Animated.timing(anim, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      anim.removeListener(listener);
    });
    return () => anim.removeListener(listener);
  }, [value, duration, anim]);

  return (
    <Text style={style}>
      {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
    </Text>
  );
}

/* ============ HeartButton — animated heart fill ============ */

export function HeartButton({
  filled = false,
  onPress,
  size = 22,
  color = colors.primary,
  style,
}: {
  filled?: boolean;
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [isFilled, setIsFilled] = useState(filled);

  const handlePress = () => {
    const newFilled = !isFilled;
    setIsFilled(newFilled);

    // Bounce animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          name={isFilled ? 'heart' : 'heart-outline'}
          family="material-community"
          size={size}
          color={isFilled ? color : colors.textTertiary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

/* ============ SpringScale — spring scale-in on mount ============ */

export function SpringScale({
  children,
  delay = 0,
  initialScale = 0.8,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  initialScale?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = useRef(new Animated.Value(initialScale)).current;

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }).start();
    }, delay);
    return () => clearTimeout(t);
  }, [delay, scale]);

  return <Animated.View style={[{ transform: [{ scale }] }, style]}>{children}</Animated.View>;
}

/* ============ SlideInFromBottom — for sheets, toasts ============ */

export function SlideInFromBottom({
  children,
  visible,
  duration = 300,
  style,
}: {
  children: React.ReactNode;
  visible: boolean;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const translateY = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 200,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration, translateY]);

  return <Animated.View style={[{ transform: [{ translateY }] }, style]}>{children}</Animated.View>;
}

/* ============ BounceIn — bounce in on mount ============ */

export function BounceIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = setTimeout(() => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(t);
  }, [delay, scale, opacity]);

  return (
    <Animated.View style={[{ transform: [{ scale }], opacity }, style]}>
      {children}
    </Animated.View>
  );
}

/* ============ Toast — slide-in notification ============ */

type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastData = { id: number; message: string; type: ToastType; icon?: string };

let toastId = 0;
const toastListeners = new Set<(toasts: ToastData[]) => void>();
let currentToasts: ToastData[] = [];

export function showToast(message: string, type: ToastType = 'success', icon?: string) {
  const id = ++toastId;
  currentToasts = [...currentToasts, { id, message, type, icon }];
  toastListeners.forEach((l) => l(currentToasts));

  // Auto-dismiss after 2.5s
  setTimeout(() => {
    currentToasts = currentToasts.filter((t) => t.id !== id);
    toastListeners.forEach((l) => l(currentToasts));
  }, 2500);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const listener = (newToasts: ToastData[]) => setToasts([...newToasts]);
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  const colors_by_type: Record<ToastType, string> = {
    success: colors.success,
    error: colors.danger,
    info: colors.info,
    warning: colors.warning,
  };

  const icons_by_type: Record<ToastType, string> = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'information',
    warning: 'alert',
  };

  return (
    <View style={toastStyles.container} pointerEvents="none">
      {toasts.map((toast) => (
        <BounceIn key={toast.id}>
          <View
            style={[
              toastStyles.toast,
              { borderLeftColor: colors_by_type[toast.type] },
            ]}
          >
            <Icon
              name={toast.icon || icons_by_type[toast.type]}
              family="material-community"
              size={20}
              color={colors_by_type[toast.type]}
            />
            <Text style={toastStyles.message}>{toast.message}</Text>
          </View>
        </BounceIn>
      ))}
    </View>
  );
}

const toastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    alignItems: 'center',
    gap: 8,
    zIndex: 9999,
    elevation: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    ...shadows.lg,
    maxWidth: '100%',
  },
  message: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
});

/* ============ Shared styles ============ */

const styles = StyleSheet.create({
  shimmerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.sm,
  },
});
