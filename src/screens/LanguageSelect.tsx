/**
 * Language selection — first run + editable later from Menu.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { colors, fontFamilies, fontSizes, spacing, radii } from '../theme/theme';
import { useTranslation, setLang, type Lang } from '../i18n';
import { Button, Icon } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LangOption = { code: Lang; label: string; native: string; flag: string };
const LANGS: LangOption[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

export function LanguageSelect() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<Lang>('en');

  const handleUpdate = () => {
    setLang(selected);
    nav.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.illoWrap}>
          <Icon name="translate" family="material" size={88} color={colors.white} />
        </View>
        <Text style={styles.title}>{t('choose_your_language')}</Text>
        <Text style={styles.subtitle}>{t('choose_your_language_to_proceed')}</Text>

        <View style={styles.list}>
          {LANGS.map((l) => {
            const active = selected === l.code;
            return (
              <TouchableOpacity
                key={l.code}
                onPress={() => setSelected(l.code)}
                style={[styles.option, active && styles.optionActive]}
              >
                <Text style={styles.flag}>{l.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, active && styles.labelActive]}>{l.label}</Text>
                  <Text style={styles.native}>{l.native}</Text>
                </View>
                {active ? (
                  <MaterialCommunityIcons name="radiobox-marked" size={22} color={colors.primary} />
                ) : (
                  <MaterialCommunityIcons name="radiobox-blank" size={22} color={colors.textTertiary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.hint}>*{t('you_can_change_language') || 'You can change language later from menu bar'}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button title={t('update') || 'Update'} onPress={handleUpdate} fullWidth size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primarySoft },
  scroll: { padding: 24, paddingBottom: 100 },
  illoWrap: {
    width: 140, height: 140, borderRadius: 70, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 24,
  },
  title: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxxl, color: colors.text, textAlign: 'center' },
  subtitle: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.textSecondary, textAlign: 'center', marginTop: 6 },
  list: { marginTop: 32 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.white, borderRadius: radii.md, padding: 14, marginBottom: 12,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  optionActive: { borderColor: colors.primary },
  flag: { fontSize: 28 },
  label: { fontFamily: fontFamilies.bold, fontSize: fontSizes.lg, color: colors.text },
  labelActive: { color: colors.primary },
  native: { fontFamily: fontFamilies.regular, fontSize: fontSizes.sm, color: colors.textSecondary, marginTop: 2 },
  hint: { fontFamily: fontFamilies.regular, fontSize: fontSizes.xs, color: colors.textTertiary, textAlign: 'center', marginTop: 16 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'transparent' },
});
