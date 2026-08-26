/**
 * Privacy Policy.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header } from '../../components';

const SECTIONS = [
  { title: '1. Information We Collect', body: 'We collect information you provide directly: name, email, phone, delivery address, and payment details. We also collect usage data such as orders placed, app interactions, and device information.' },
  { title: '2. How We Use Your Information', body: 'Your information is used to process orders, provide customer support, send notifications about your orders and offers, improve our services, and comply with legal obligations.' },
  { title: '3. Transaction Details', body: 'Payment information is processed securely through our payment partners. We do not store your full card numbers or banking credentials on our servers.' },
  { title: '4. Permissions', body: 'The app may request permissions for location (to find nearby stores), notifications (order updates), camera (profile photo, document upload), and storage. You can manage these in your device settings.' },
  { title: '5. Data Sharing', body: 'We share necessary information with vendors (to fulfil orders), delivery partners (to deliver orders), and payment processors. We never sell your data to third parties.' },
  { title: '6. Data Security', body: 'We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information.' },
  { title: '7. Your Rights', body: 'You have the right to access, correct, or delete your personal information. Contact support@blinksygold.com to exercise these rights.' },
  { title: '8. Children\'s Privacy', body: 'Our services are not directed to children under 18. We do not knowingly collect information from minors.' },
  { title: '9. Updates', body: 'We may update this policy periodically. We will notify you of significant changes through the app or via email.' },
];

export function Privacy() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  return (
    <View style={styles.container}>
      <Header title={t('privacy_policy') || 'Privacy Policy'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text style={styles.intro}>Last updated: August 25, 2026</Text>
        <Text style={styles.introBody}>This Privacy Policy explains how BlinkSyGold collects, uses, and protects your personal information.</Text>
        {SECTIONS.map((s, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionBody}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  intro: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.textSecondary },
  introBody: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.text, marginTop: 8, lineHeight: 22 },
  section: { marginTop: 20 },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 6 },
  sectionBody: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary, lineHeight: 22 },
});
