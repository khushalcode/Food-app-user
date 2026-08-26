/**
 * Add Address — form with label, contact, address, map picker.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Button, TextInput, Icon, Chip } from '../../components';

export function AddAddress() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [label, setLabel] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [form, setForm] = useState({ contact: '', phone: '', address: '', city: '', pincode: '' });
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      nav.goBack();
    }, 600);
  };

  return (
    <View style={styles.container}>
      <Header title={t('add_new_address') || 'Add New Address'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Map picker */}
        <TouchableOpacity style={styles.mapPicker}>
          <Icon name="map" family="material-community" size={48} color={colors.primary} />
          <Text style={styles.mapPickerTitle}>{t('set_from_map') || 'Set From Map'}</Text>
          <Text style={styles.mapPickerHint}>Drag the pin to your exact location</Text>
        </TouchableOpacity>

        {/* Label chips */}
        <Text style={styles.sectionLabel}>{t('address_type') || 'Address Type'}</Text>
        <View style={styles.labelRow}>
          {(['Home', 'Office', 'Other'] as const).map((l) => (
            <Chip key={l} label={l} selected={label === l} onPress={() => setLabel(l)} icon={l === 'Home' ? 'home' : l === 'Office' ? 'briefcase' : 'map-marker'} />
          ))}
        </View>

        <TextInput label={t('contact_name') || 'Contact Name'} value={form.contact} onChangeText={(v) => setForm({ ...form, contact: v })} placeholder="Khushal Arya" icon="account-outline" />
        <TextInput label={t('phone') || 'Phone'} value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} placeholder="+91 98765 43210" keyboardType="phone-pad" icon="phone-outline" />
        <TextInput label={t('complete_address') || 'Complete Address'} value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} placeholder="House no, street, area" icon="map-marker-outline" multiline />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TextInput label={t('city') || 'City'} value={form.city} onChangeText={(v) => setForm({ ...form, city: v })} placeholder="Ludhiana" icon="city" />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput label={t('pincode') || 'Pincode'} value={form.pincode} onChangeText={(v) => setForm({ ...form, pincode: v })} placeholder="141008" keyboardType="numeric" icon="map-marker-radius-outline" />
          </View>
        </View>

        <Button title={t('save') || 'Save Address'} onPress={save} loading={saving} fullWidth size="lg" style={{ marginTop: 8 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapPicker: { height: 180, backgroundColor: colors.surfaceAlt, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  mapPickerTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginTop: 8 },
  mapPickerHint: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  sectionLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary, marginBottom: 8 },
  labelRow: { flexDirection: 'row', marginBottom: 16 },
  row: { flexDirection: 'row' },
});
