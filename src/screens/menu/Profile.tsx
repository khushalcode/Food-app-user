/**
 * Profile — cream-themed dashboard (light/dark mode toggle), order stats.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Icon, PlainHeader, Button, AssetImage, SpringScale, FadeIn, Stagger } from '../../components';
import { user, inr } from '../../data/mock';

export function Profile() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  const shortcuts = [
    { id: 'orders', icon: 'clipboard-list-outline', label: 'Orders', color: '#FF6B85' },
    { id: 'wallet', icon: 'wallet', label: 'Wallet', color: '#16A34A' },
    { id: 'coupons', icon: 'ticket-confirmation', label: 'Coupons', color: '#FFC107' },
    { id: 'address', icon: 'map-marker', label: 'Address', color: '#2563EB' },
    { id: 'refer', icon: 'gift', label: 'Refer', color: '#7C3AED' },
    { id: 'support', icon: 'lifebuoy', label: 'Support', color: '#0EA5E9' },
    { id: 'settings', icon: 'cog', label: 'Settings', color: '#6B7280' },
    { id: 'edit', icon: 'account-edit', label: 'Edit', color: colors.primary },
  ];

  const openShortcut = (id: string) => {
    switch (id) {
      case 'orders': nav.getParent()?.navigate('OrdersTab' as any); break;
      case 'wallet': nav.navigate('Wallet'); break;
      case 'coupons': nav.navigate('Coupons'); break;
      case 'address': nav.navigate('AddressBook'); break;
      case 'refer': nav.navigate('ReferEarn'); break;
      case 'support': nav.navigate('HelpSupport'); break;
      case 'settings': nav.navigate('Settings'); break;
      case 'edit': nav.navigate('EditProfile'); break;
    }
  };

  return (
    <View style={styles.container}>
      <PlainHeader title={t('profile') || 'Profile'} onBack={() => nav.goBack()} right={<TouchableOpacity><Icon name="cog-outline" family="material-community" size={22} color={colors.text} /></TouchableOpacity>} />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Cream hero */}
        <View style={styles.hero}>
          <SpringScale delay={100} initialScale={0.5}>
          <View style={styles.avatar}>
            <Icon name="account" family="material-community" size={48} color={colors.white} />
          </View>
          </SpringScale>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>

          {/* Birthday prompt */}
          <View style={styles.bdayBanner}>
            <Icon name="cake-variant" family="material-community" size={22} color={colors.primary} />
            <Text style={styles.bdayText}>Your birthday is on {user.birthday} — get ready for surprise treats!</Text>
          </View>

          {/* Order stats */}
          <View style={styles.statsRow}>
            <Stat value={user.totalOrders} label="Orders" />
            <Stat value={inr(user.walletBalance)} label="Wallet" />
            <Stat value={user.loyaltyPoints} label="Points" />
          </View>
        </View>

        {/* Shortcuts */}
        <View style={styles.shortcutsGrid}>
          {shortcuts.map((s) => (
            <TouchableOpacity key={s.id} onPress={() => openShortcut(s.id)} style={styles.shortcutTile}>
              <View style={[styles.shortcutIcon, { backgroundColor: s.color }]}>
                <Icon name={s.icon} family="material-community" size={22} color={colors.white} />
              </View>
              <Text style={styles.shortcutLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title={t('edit_profile') || 'Edit Profile'} onPress={() => nav.navigate('EditProfile')} variant="primary" size="lg" style={{ margin: 16 }} />
      </ScrollView>
    </View>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.cream, padding: 20, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...shadows.md },
  userName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxxl, color: colors.text, marginTop: 12 },
  userEmail: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary, marginTop: 4 },
  userPhone: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.text, marginTop: 2 },
  bdayBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 16 },
  bdayText: { flex: 1, fontFamily: fontFamilies.regular, fontSize: 12, color: colors.text },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
  statCard: { flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: 12, alignItems: 'center' },
  statValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text },
  statLabel: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  shortcutsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 16 },
  shortcutTile: { width: '23%', alignItems: 'center' },
  shortcutIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  shortcutLabel: { fontFamily: fontFamilies.medium, fontSize: 11, color: colors.text, marginTop: 6 },
});
