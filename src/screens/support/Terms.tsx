/**
 * Terms & Conditions.
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
  { title: '1. Definitions', body: '"BlinkSyGold", "we", "us" refers to BlinkSyGold Pvt Ltd. "User" refers to any individual using our mobile application. "Vendor" refers to a restaurant, store, or service provider registered on our platform. "Delivery Partner" refers to an individual delivering orders.' },
  { title: '2. Eligibility', body: 'You must be at least 18 years old to use this app. By registering, you confirm that all information provided is accurate and complete.' },
  { title: '3. Use of the App', body: 'You agree to use the app only for lawful purposes. You may not misuse the platform, place fraudulent orders, or harass vendors, delivery partners, or other users.' },
  { title: '4. Orders & Payments', body: 'When you place an order, you enter into a contract with the vendor. Payments are processed securely. Cash on Delivery is available on select orders. Prices may change without notice.' },
  { title: '5. Cancellations & Refunds', body: 'Orders can be cancelled before they are accepted by the vendor. Refunds for cancelled orders are processed to the original payment method or wallet within 5-7 business days.' },
  { title: '6. Vendor Responsibilities', body: 'Vendors are responsible for the quality, hygiene, and accuracy of items listed. Vendors agree to fulfil orders promptly and maintain necessary licenses.' },
  { title: '7. Limitation of Liability', body: 'BlinkSyGold is not liable for indirect, incidental, or consequential damages arising from the use of the app. Our liability is limited to the order value.' },
  { title: '8. Changes to Terms', body: 'We may update these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.' },
];

export function Terms() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  return (
    <View style={styles.container}>
      <Header title={t('terms_and_conditions') || 'Terms & Conditions'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text style={styles.intro}>Last updated: August 25, 2026</Text>
        <Text style={styles.introBody}>Welcome to BlinkSyGold. By using our app, you agree to the following terms and conditions. Please read them carefully.</Text>
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
