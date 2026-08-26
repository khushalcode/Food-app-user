/**
 * Edit Profile — avatar upload, name/email/phone inputs, save.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Button, TextInput, Icon } from '../../components';
import { user } from '../../data/mock';

export function EditProfile() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [firstName, setFirstName] = useState(user.name.split(' ')[0]);
  const [lastName, setLastName] = useState(user.name.split(' ').slice(1).join(' '));
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      nav.goBack();
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Header title={t('edit_profile') || 'Edit Profile'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Icon name="account" family="material-community" size={48} color={colors.white} />
          </View>
          <TouchableOpacity style={styles.uploadBtn}>
            <Icon name="camera" family="material-community" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <TextInput label={t('first_name') || 'First Name'} value={firstName} onChangeText={setFirstName} icon="account-outline" />
            </View>
            <View style={{ flex: 1 }}>
              <TextInput label={t('last_name') || 'Last Name'} value={lastName} onChangeText={setLastName} icon="account-outline" />
            </View>
          </View>
          <TextInput label={t('email') || 'Email'} value={email} onChangeText={setEmail} keyboardType="email-address" icon="email-outline" />
          <TextInput label={t('phone') || 'Phone'} value={phone} onChangeText={setPhone} keyboardType="phone-pad" icon="phone-outline" />

          <TouchableOpacity style={styles.changePassRow}>
            <Icon name="lock-reset" family="material-community" size={22} color={colors.primary} />
            <Text style={styles.changePassText}>{t('change_password') || 'Change Password'}</Text>
            <Icon name="chevron-right" family="material-community" size={20} color={colors.textTertiary} />
          </TouchableOpacity>

          <Button title={t('update_profile') || 'Update Profile'} onPress={save} loading={saving} fullWidth size="lg" style={{ marginTop: 16 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  avatarWrap: { alignItems: 'center', marginTop: 16, position: 'relative' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  uploadBtn: { position: 'absolute', right: '32%', bottom: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.text, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row' },
  changePassRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, backgroundColor: colors.white, borderRadius: 10, marginTop: 8 },
  changePassText: { flex: 1, fontFamily: fontFamilies.medium, fontSize: fontSizes.md, color: colors.text },
});
