/**
 * Reset Password — new + confirm.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Button, TextInput, Header, Icon } from '../../components';

export function ResetPassword() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav.replace('SignIn');
    }, 600);
  };

  return (
    <View style={styles.container}>
      <Header title={t('reset_password') || 'Reset Password'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.illo}>
          <Icon name="lock-check-outline" family="material-community" size={80} color={colors.primary} />
        </View>
        <Text style={styles.title}>{t('enter_new_password') || 'Enter New Password'}</Text>

        <View style={{ marginTop: 24 }}>
          <TextInput
            label={t('new_password') || 'New Password'}
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry={!show}
            icon="lock-outline"
            rightIcon={show ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShow(!show)}
          />
          <TextInput
            label={t('confirm_password') || 'Confirm Password'}
            value={confirm}
            onChangeText={setConfirm}
            placeholder="••••••••"
            secureTextEntry={!show}
            icon="lock-check-outline"
          />
          <Button
            title={t('update') || 'Update'}
            onPress={submit}
            loading={loading}
            fullWidth
            size="lg"
            disabled={!pass || pass !== confirm}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: 20, paddingBottom: 60 },
  illo: { alignItems: 'center', marginTop: 16 },
  title: { fontFamily: fontFamilies.bold, fontSize: fontSizes.xxl, color: colors.text, textAlign: 'center', marginTop: 12 },
});
