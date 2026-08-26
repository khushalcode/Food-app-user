/**
 * Settings — dark mode, notifications, biometric, language link.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation, setLang, type Lang } from '../../i18n';
import { Header, Icon, Card } from '../../components';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.toggle, on && styles.toggleOn]}>
      <View style={[styles.toggleThumb, on && styles.toggleThumbOn]} />
    </TouchableOpacity>
  );
}

export function Settings() {
  const { t, lang } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [hideSensitive, setHideSensitive] = useState(false);

  return (
    <View style={styles.container}>
      <Header title={t('settings') || 'Settings'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 12, gap: 12 }}>
        <Card padding={0}>
          <Row icon="theme-light-dark" label="Dark Mode" desc="Use dark theme across the app"><Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} /></Row>
          <Divider />
          <Row icon="bell-outline" label={t('notification') || 'Notifications'} desc="Order updates, offers, alerts"><Toggle on={notifications} onToggle={() => setNotifications(!notifications)} /></Row>
          <Divider />
          <Row icon="fingerprint" label="Biometric Login" desc="Use fingerprint / face unlock"><Toggle on={biometric} onToggle={() => setBiometric(!biometric)} /></Row>
          <Divider />
          <Row icon="eye-off-outline" label="Hide sensitive items" desc="Mask wallet balance, order totals"><Toggle on={hideSensitive} onToggle={() => setHideSensitive(!hideSensitive)} /></Row>
        </Card>

        <Card padding={0}>
          <TouchableOpacity style={styles.menuRow} onPress={() => nav.navigate('LanguageSelect' as any)}>
            <Row icon="translate" label={t('language') || 'Language'} desc={`Currently: ${lang.toUpperCase()}`} noDivider>
              <Icon name="chevron-right" family="material-community" size={20} color={colors.textTertiary} />
            </Row>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.menuRow} onPress={() => nav.navigate('Notifications')}>
            <Row icon="bell-badge-outline" label="Notification Preferences" desc="Choose what you want to hear about" noDivider>
              <Icon name="chevron-right" family="material-community" size={20} color={colors.textTertiary} />
            </Row>
          </TouchableOpacity>
        </Card>

        {/* Quick language switcher */}
        <Card>
          <Text style={styles.sectionTitle}>{t('choose_your_language') || 'Choose your language'}</Text>
          <View style={styles.langRow}>
            {(['en', 'hi', 'pa'] as Lang[]).map((l) => (
              <TouchableOpacity
                key={l}
                onPress={() => setLang(l)}
                style={[styles.langBtn, lang === l && styles.langBtnActive]}
              >
                <Text style={[styles.langLabel, lang === l && styles.langLabelActive]}>
                  {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'ਪੰਜਾਬੀ'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card padding={0}>
          <Row icon="file-document-outline" label="App Version" desc="1.0.6 (build 6)" noDivider><Text style={styles.versionText}>v1.0.6</Text></Row>
        </Card>
      </ScrollView>
    </View>
  );
}

function Row({ icon, label, desc, children, noDivider = false }: { icon: string; label: string; desc?: string; children?: React.ReactNode; noDivider?: boolean }) {
  return (
    <View style={[styles.menuRow, noDivider && { borderBottomWidth: 0 }]}>
      <View style={styles.iconWrap}><Icon name={icon} family="material-community" size={20} color={colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>
      {children}
    </View>
  );
}

function Divider() { return <View style={{ height: 1, backgroundColor: colors.divider, marginLeft: 56 }} />; }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: 1, borderBottomColor: colors.divider },
  iconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
  desc: { fontFamily: fontFamilies.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: colors.border, padding: 2 },
  toggleOn: { backgroundColor: colors.success },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.white },
  toggleThumbOn: { transform: [{ translateX: 20 }] },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  langRow: { flexDirection: 'row', gap: 8 },
  langBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center' },
  langBtnActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  langLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary },
  langLabelActive: { color: colors.primary },
  versionText: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.textSecondary },
});
