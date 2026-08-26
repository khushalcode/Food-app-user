/**
 * BlinkSyGold shared UI components.
 * All chrome icons use @expo/vector-icons (vector, NOT raster screenshots),
 * fulfilling the user's instruction to "remove mobile screen shots icons from top to bottom".
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StatusBar,
  TextInput as RNTextInput,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme, colors, spacing, radii, fontFamilies, fontSizes, shadows } from '../theme/theme';

/** Returns a MaterialCommunityIcons glyph name from a single icon key. */
export type IconName = string;

export function Icon({
  name,
  family = 'material-community',
  size = 22,
  color = colors.text,
  style,
}: {
  name: IconName;
  family?: 'material-community' | 'ionicons' | 'material' | 'feather';
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const props = { name: name as any, size, color, style };
  switch (family) {
    case 'ionicons':
      return <Ionicons {...props} />;
    case 'material':
      return <MaterialIcons {...props} />;
    case 'feather':
      return <Feather {...props} />;
    default:
      return <MaterialCommunityIcons {...props} />;
  }
}

/** Primary brand button. */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'success' | 'danger' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}) {
  const palette = {
    primary: { bg: colors.primary, fg: colors.white, border: colors.primary },
    outline: { bg: 'transparent', fg: colors.primary, border: colors.primary },
    ghost: { bg: 'transparent', fg: colors.textSecondary, border: 'transparent' },
    success: { bg: colors.success, fg: colors.white, border: colors.success },
    danger: { bg: colors.danger, fg: colors.white, border: colors.danger },
    dark: { bg: colors.text, fg: colors.white, border: colors.text },
  }[variant];

  const sizeMap = {
    sm: { h: 34, px: 12, fs: fontSizes.sm },
    md: { h: 44, px: 16, fs: fontSizes.md },
    lg: { h: 52, px: 20, fs: fontSizes.lg },
  }[size];

  // Scale animation on press
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, fullWidth && { flex: 1 }, style as any]}>
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {
          height: sizeMap.h,
          paddingHorizontal: sizeMap.px,
          backgroundColor: palette.bg,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: palette.border,
          borderRadius: radii.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && { flex: 1 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} size="small" />
      ) : (
        <>
          {icon && <Icon name={icon} size={18} color={palette.fg} />}
          <Text
            style={[
              { fontFamily: fontFamilies.bold, fontSize: sizeMap.fs, color: palette.fg },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
    </Animated.View>
  );
}

/** Header with red gradient, optional back button, title, and right-side actions. */
export function Header({
  title,
  onBack,
  right,
  showBack = true,
  subtitle,
  gradientHeight = 120,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  showBack?: boolean;
  subtitle?: string;
  gradientHeight?: number;
}) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ paddingTop: insets.top + 8, paddingBottom: 14, paddingHorizontal: 16 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 36 }}>
        {showBack && onBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ marginRight: 8 }}
          >
            <Icon name="arrow-left" family="feather" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          {title && (
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fontFamilies.bold,
                fontSize: fontSizes.xl,
                color: colors.white,
              }}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fontFamilies.regular,
                fontSize: fontSizes.sm,
                color: 'rgba(255,255,255,0.85)',
                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {right}
      </View>
    </LinearGradient>
  );
}

/** Plain header (white background) for sub-pages. */
export function PlainHeader({
  title,
  onBack,
  right,
  showBack = true,
}: {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  showBack?: boolean;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: 36 }}>
        {showBack && onBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{ marginRight: 8 }}
          >
            <Icon name="arrow-left" family="feather" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          {title && (
            <Text
              numberOfLines={1}
              style={{ fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text }}
            >
              {title}
            </Text>
          )}
        </View>
        {right}
      </View>
    </View>
  );
}

/** Text input with floating label-like behavior. */
export function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
  error,
  style,
  rightIcon,
  onRightIconPress,
  multiline = false,
}: {
  label?: string;
  value: string;
  onChangeText?: (v: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  icon?: IconName;
  error?: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  multiline?: boolean;
}) {
  return (
    <View style={[{ marginBottom: 12 }, style]}>
      {label && (
        <Text style={{ fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: multiline ? 'flex-start' : 'center',
          borderWidth: 1.5,
          borderColor: error ? colors.danger : colors.border,
          backgroundColor: colors.white,
          borderRadius: radii.sm,
          paddingHorizontal: 12,
          minHeight: 48,
        }}
      >
        {icon && (
          <Icon name={icon} size={20} color={colors.textTertiary} style={{ marginRight: 8 }} />
        )}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          style={{
            flex: 1,
            fontFamily: fontFamilies.regular,
            fontSize: fontSizes.md,
            color: colors.text,
            paddingVertical: multiline ? 10 : 0,
            minHeight: multiline ? 80 : undefined,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Icon name={rightIcon} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ fontFamily: fontFamilies.regular, fontSize: fontSizes.xs, color: colors.danger, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}

/** Card surface. */
export function Card({
  children,
  style,
  padding = 14,
  shadow = 'sm',
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number | string;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radii.md,
          padding: typeof padding === 'number' ? padding : 0,
        },
        shadow !== 'none' && shadows[shadow],
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Star rating row. */
export function StarRating({ rating, size = 12, showNumber = true }: { rating: number; size?: number; showNumber?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Icon name="star" family="material" size={size} color={colors.accent} />
      {showNumber && (
        <Text style={{ fontFamily: fontFamilies.bold, fontSize: size - 1, color: colors.text }}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}

/** Veg / non-veg indicator. */
export function VegIndicator({ veg = true, size = 14 }: { veg?: boolean; size?: number }) {
  const color = veg ? colors.success : colors.danger;
  return (
    <View style={{ width: size, height: size, borderWidth: 1.5, borderColor: color, borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size * 0.25, backgroundColor: color }} />
    </View>
  );
}

/** Section header with title + optional "See All" link. */
export function SectionHeader({
  title,
  onSeeAll,
  rightLabel = 'See All',
  color,
}: {
  title: string;
  onSeeAll?: () => void;
  rightLabel?: string;
  color?: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 18, marginBottom: 10 }}>
      <Text style={{ fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: color ?? colors.text }}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={{ fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: color ?? colors.primary }}>
            {rightLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/** Local-image asset loader with safe fallback. */
const requireImage = (name: string): ImageSourcePropType => {
  // For known asset names we'll resolve statically. For unknown, fall back to placeholder.
  // (React Native bundler requires static imports — handled in ./assetMap.ts)
  return require('../utils/assetMap').getImage(name);
};

export function AssetImage({
  name,
  source,
  style,
  resizeMode = 'cover',
}: {
  name?: string;
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch';
}) {
  const src = source ?? (name ? requireImage(name) : null);
  if (!src) {
    return (
      <View
        style={[
          {
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style as StyleProp<ViewStyle>,
        ]}
      >
        <Icon name="image-off" family="material-community" size={24} color={colors.textTertiary} />
      </View>
    );
  }
  return <Image source={src} style={style as any} resizeMode={resizeMode} />;
}

/**
 * FoodImage — renders a real food photo by name from the food asset registry.
 * Falls back to a placeholder View with the given fallbackIcon if the image is not found.
 */
export function FoodImage({
  name,
  style,
  fallbackIcon = 'food-variant',
  fallbackIconSize = 32,
  fallbackColor = colors.primarySoft,
  resizeMode = 'cover',
}: {
  name: string;
  style: StyleProp<ImageStyle>;
  fallbackIcon?: string;
  fallbackIconSize?: number;
  fallbackColor?: string;
  resizeMode?: 'cover' | 'contain' | 'stretch';
}) {
  let src: ImageSourcePropType | null = null;
  try {
    src = require('../utils/foodAssetMap').getFoodImage(name);
  } catch {}
  if (!src) {
    return (
      <View style={[{ backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }, style as StyleProp<ViewStyle>]}>
        <Icon name={fallbackIcon} size={fallbackIconSize} color={fallbackColor} />
      </View>
    );
  }
  return <Image source={src} style={style} resizeMode={resizeMode} />;
}

/** Skeleton placeholder block. */
export function Skeleton({ width = '100%', height = 16, radius = 6, style }: { width?: number | string; height?: number | string; radius?: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[
        {
          width: width as any,
          height: height as any,
          backgroundColor: colors.surfaceAlt,
          borderRadius: radius,
        },
        style,
      ]}
    />
  );
}

/** Empty-state illustration with optional CTA. */
export function EmptyState({
  image = 'no_data_found',
  title,
  subtitle,
  ctaLabel,
  onCta,
}: {
  image?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  onCta?: () => void;
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <AssetImage name={image} style={{ width: 200, height: 200, marginBottom: 16 }} resizeMode="contain" />
      <Text style={{ fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text, textAlign: 'center' }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{ fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary, textAlign: 'center', marginTop: 6 }}>
          {subtitle}
        </Text>
      )}
      {ctaLabel && onCta && (
        <Button title={ctaLabel} onPress={onCta} style={{ marginTop: 18 }} />
      )}
    </View>
  );
}

/** Pill / chip button. */
export function Chip({
  label,
  selected = false,
  onPress,
  icon,
  color = colors.primary,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: radii.pill,
        backgroundColor: selected ? color : colors.surfaceAlt,
        borderWidth: 1,
        borderColor: selected ? color : colors.border,
        marginRight: 8,
      }}
    >
      {icon && <Icon name={icon} size={14} color={selected ? colors.white : colors.textSecondary} />}
      <Text style={{ fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: selected ? colors.white : colors.textSecondary }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/** Small badge (e.g. discount %). */
export function Badge({ label, color = colors.primary, textColor = colors.white }: { label: string; color?: string; textColor?: string }) {
  return (
    <View style={{ backgroundColor: color, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
      <Text style={{ fontFamily: fontFamilies.bold, fontSize: fontSizes.xs, color: textColor }}>{label}</Text>
    </View>
  );
}

/** Status bar spacer. */
export function StatusBarSpacer({ color = colors.primary }: { color?: string }) {
  const insets = useSafeAreaInsets();
  return <View style={{ height: insets.top, backgroundColor: color }} />;
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 100 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  center: { alignItems: 'center', justifyContent: 'center' },
  textBody: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.text },
  textTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text },
  textCaption: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary },
});

// Re-export animation primitives
export * from './animations';
