/**
 * Notifications center.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, EmptyState } from '../../components';

const SAMPLE_NOTIFS = [
  { id: '1', icon: 'shopping', color: colors.success, title: 'Order Delivered', body: 'Your order ORD-7820 from Tasty Fresh was delivered. Rate your experience!', time: '2h ago' },
  { id: '2', icon: 'tag', color: colors.primary, title: 'Special Offer', body: 'Get 50% off on all Pizza orders above ₹399. Use code PIZZA100.', time: '5h ago' },
  { id: '3', icon: 'wallet', color: colors.warning, title: 'Wallet Credited', body: '₹50 cashback added to your BlinkSy Money wallet.', time: '1d ago' },
  { id: '4', icon: 'gift', color: colors.info, title: 'Refer & Earn', body: 'Invite friends and earn ₹50 in wallet for each signup.', time: '2d ago' },
];

export function Notifications() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const notifs = SAMPLE_NOTIFS;

  return (
    <View style={styles.container}>
      <Header title={t('notification') || 'Notifications'} onBack={() => nav.goBack()} right={<TouchableOpacity><Text style={styles.clearAll}>{t('clear_all') || 'Clear All'}</Text></TouchableOpacity>} />
      {notifs.length === 0 ? (
        <EmptyState
          image="notification_placeholder"
          title={t('no_notification_found') || 'No notification found'}
          subtitle="Your alerts will appear here"
        />
      ) : (
        <FlatList
          data={notifs}
          keyExtractor={(n) => n.id}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: item.color + '20' }]}>
                <Icon name={item.icon} family="material-community" size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  clearAll: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.white },
  row: { flexDirection: 'row', gap: 12, backgroundColor: colors.white, borderRadius: 12, padding: 12, ...shadows.sm },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, flex: 1 },
  time: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textTertiary },
  body: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
});
