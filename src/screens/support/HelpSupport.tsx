/**
 * Help & Support — contact channels + FAQ.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, Card, Button, AssetImage } from '../../components';
import { supportChannels } from '../../data/mock';

export function HelpSupport() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  return (
    <View style={styles.container}>
      <Header title={t('help_and_support') || 'Help & Support'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 12 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Icon name="lifebuoy" family="material-community" size={48} color={colors.primary} />
          <Text style={styles.heroTitle}>{t('support_description') || "We're here to help!"}</Text>
          <Text style={styles.heroSubtitle}>Contact our support team for solutions, answers to your queries.</Text>
        </View>

        {/* Contact channels */}
        <Card padding={0}>
          {supportChannels.map((c, i) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => c.id === 'ai' && nav.navigate('LiveChat')}
              style={[styles.channelRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}
            >
              <View style={styles.channelIcon}><Icon name={c.icon} family="material-community" size={22} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.channelTitle}>{c.title}</Text>
                <Text style={styles.channelDesc}>{c.desc}</Text>
              </View>
              <View style={styles.channelAction}>
                <Text style={styles.channelActionText}>{c.action}</Text>
                <Icon name="chevron-right" family="material-community" size={18} color={colors.textTertiary} />
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick FAQ */}
        <Card>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {[
            { q: 'How do I track my order?', a: 'Go to My Orders → Running tab and tap on the order to see live tracking.' },
            { q: 'How do I apply a coupon?', a: 'On cart page, enter your code in the promo box and tap Apply.' },
            { q: 'What is BlinkSy Money?', a: 'BlinkSy Money is your in-app wallet. Earn cashback, get instant refunds.' },
            { q: 'How do I become a vendor?', a: 'Tap Vendor Registration in the Menu and follow the steps.' },
          ].map((faq, i) => (
            <TouchableOpacity key={i} style={[styles.faqRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }]}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Icon name="chevron-down" family="material-community" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </Card>

        <Button title={t('contact_for_support') || 'Contact for Support'} onPress={() => nav.navigate('LiveChat')} fullWidth size="lg" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.white, borderRadius: 16, padding: 24, alignItems: 'center', ...shadows.sm },
  heroTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xl, color: colors.text, marginTop: 12, textAlign: 'center' },
  heroSubtitle: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, textAlign: 'center', marginTop: 4, lineHeight: 18 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  channelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  channelIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  channelTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  channelDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  channelAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  channelActionText: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.primary },
  faqRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  faqQ: { flex: 1, fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
});
