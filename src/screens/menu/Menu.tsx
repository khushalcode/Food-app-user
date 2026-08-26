/**
 * Menu hub — list of all account-related sections.
 * Mirrors the screen PDF: Your Information / Payment & rewards / Support & policies / Join as Partner / Preferences.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Icon, Card, PlainHeader, AssetImage } from '../../components';
import { menuSections, user, inr } from '../../data/mock';

export function Menu() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  const routeFor = (id: string) => {
    switch (id) {
      case 'edit_profile': return 'EditProfile' as const;
      case 'address_book': return 'AddressBook' as const;
      case 'wishlist': return 'Wishlist' as const;
      case 'notifications': return 'Notifications' as const;
      case 'language': return undefined; // open language modal? for now go to Settings
      case 'wallet': return 'Wallet' as const;
      case 'loyalty': return 'LoyaltyPoints' as const;
      case 'coupons': return 'Coupons' as const;
      case 'refer': return 'ReferEarn' as const;
      case 'live_chat': return 'LiveChat' as const;
      case 'help': return 'HelpSupport' as const;
      case 'terms': return 'Terms' as const;
      case 'privacy': return 'Privacy' as const;
      case 'about': return undefined;
      case 'settings': return 'Settings' as const;
      case 'logout': return undefined;
      default: return undefined;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <PlainHeader title={t('menu') || 'Menu'} />

      {/* Profile header card */}
      <TouchableOpacity onPress={() => nav.navigate('Profile')} style={styles.profileCard}>
        <View style={styles.avatar}>
          <Icon name="account" family="material-community" size={36} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>
        <Icon name="chevron-right" family="material-community" size={22} color={colors.textTertiary} />
      </TouchableOpacity>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.totalOrders}</Text>
          <Text style={styles.statLabel}>{t('total_order') || 'Orders'}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{inr(user.walletBalance)}</Text>
          <Text style={styles.statLabel}>{t('wallet') || 'Wallet'}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.loyaltyPoints}</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {/* Section list */}
      {menuSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card padding={0}>
            {section.items.map((item, i) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  if (item.id === 'language') {
                    // open language screen via Settings route
                    nav.navigate('Settings');
                  } else if (item.id === 'logout') {
                    // reset to splash
                    nav.getParent()?.navigate('Splash' as any);
                  } else {
                    const r = routeFor(item.id);
                    if (r) nav.navigate(r);
                  }
                }}
                style={[styles.menuItem, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}
              >
                <View style={[styles.menuIconWrap, item.danger && { backgroundColor: colors.dangerLight }]}>
                  <Icon name={item.icon} family="material-community" size={20} color={item.danger ? colors.danger : colors.primary} />
                </View>
                <Text style={[styles.menuItemLabel, item.danger && { color: colors.danger }]}>{item.label}</Text>
                <Icon name="chevron-right" family="material-community" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      <Text style={styles.version}>BlinkSyGold v1.0.6</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.white, margin: 12, padding: 14, borderRadius: 12, ...shadows.sm },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  userName: { fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text },
  userEmail: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  userPhone: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.text, marginTop: 2 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 12, gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: 12, alignItems: 'center', ...shadows.sm },
  statValue: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text },
  statLabel: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  section: { marginTop: 18, paddingHorizontal: 12 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 },
  menuIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  menuItemLabel: { flex: 1, fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
  version: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textTertiary, textAlign: 'center', marginTop: 24 },
});
