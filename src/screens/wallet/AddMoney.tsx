/**
 * Add Money — amount input, quick picks, payment method.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Button, Icon, Card } from '../../components';

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export function AddMoney() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [amount, setAmount] = useState('500');
  const [method, setMethod] = useState('upi');
  const [adding, setAdding] = useState(false);

  const add = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      nav.goBack();
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Header title={t('add_money') || 'Add Money'} onBack={() => nav.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 12 }}>
        {/* Amount input */}
        <Card>
          <Text style={styles.sectionTitle}>{t('enter_amount') || 'Enter Amount'}</Text>
          <View style={styles.amountInputWrap}>
            <Text style={styles.currencySymbol}>₹</Text>
            <RNTextInput
              value={amount}
              onChangeText={(v) => setAmount(v.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={colors.textTertiary}
            />
          </View>
          <View style={styles.quickRow}>
            {QUICK_AMOUNTS.map((a) => (
              <TouchableOpacity
                key={a}
                onPress={() => setAmount(String(a))}
                style={[styles.quickBtn, amount === String(a) && styles.quickBtnActive]}
              >
                <Text style={[styles.quickLabel, amount === String(a) && styles.quickLabelActive]}>₹{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Payment methods */}
        <Card>
          <Text style={styles.sectionTitle}>{t('choose_payment_method') || 'Choose Payment Method'}</Text>
          {[
            { id: 'upi', label: 'UPI', desc: 'Pay via any UPI app', icon: 'cellphone-link' },
            { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay', icon: 'credit-card-outline' },
            { id: 'netbanking', label: 'Netbanking', desc: 'All major banks', icon: 'bank-outline' },
          ].map((m, i) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => setMethod(m.id)}
              style={[styles.methodRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.divider }, method === m.id && styles.methodRowActive]}
            >
              <View style={[styles.radio, method === m.id && styles.radioActive]}>{method === m.id && <View style={styles.radioInner} />}</View>
              <Icon name={m.icon} family="material-community" size={22} color={colors.text} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.methodTitle}>{m.label}</Text>
                <Text style={styles.methodDesc}>{m.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button title={`Add ₹${amount || '0'}`} onPress={add} loading={adding} variant="success" size="lg" fullWidth icon="plus" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  sectionTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  amountInputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 12 },
  currencySymbol: { fontFamily: fontFamilies.bold, fontSize: 32, color: colors.primary, marginRight: 8 },
  amountInput: { flex: 1, fontFamily: fontFamilies.bold, fontSize: 32, color: colors.text, padding: 0 },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceAlt },
  quickBtnActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  quickLabel: { fontFamily: fontFamilies.medium, fontSize: fontSizes.sm, color: colors.textSecondary },
  quickLabelActive: { color: colors.primary },
  methodRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 8, borderRadius: 8, paddingHorizontal: 4 },
  methodRowActive: { backgroundColor: colors.primarySoft, paddingHorizontal: 8 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  methodTitle: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  methodDesc: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, ...{ shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 } },
});
