/**
 * Address Book — list of saved addresses with add button.
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon, EmptyState, Button, Card } from '../../components';
import { addresses } from '../../data/mock';

export function AddressBook() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  return (
    <View style={styles.container}>
      <Header title={t('my_address') || 'My Address'} onBack={() => nav.goBack()} />
      {addresses.length === 0 ? (
        <EmptyState
          image="empty_address"
          title={t('no_saved_address_found') || 'No saved address found'}
          subtitle={t('save_places_you_use_often') || 'Save places you use often'}
          ctaLabel={t('add_new_address') || 'Add New Address'}
          onCta={() => nav.navigate('AddAddress')}
        />
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(a) => a.id}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          renderItem={({ item }) => (
            <Card>
              <View style={styles.row}>
                <View style={styles.iconWrap}>
                  <Icon name={item.label === 'Home' ? 'home' : item.label === 'Office' ? 'briefcase' : 'map-marker'} family="material-community" size={20} color={colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>{item.label} {item.isDefault && <Text style={styles.default}>(Default)</Text>}</Text>
                  <Text style={styles.contact}>{item.contactName} • {item.phone}</Text>
                  <Text style={styles.address}>{item.address}, {item.city} - {item.pincode}</Text>
                </View>
              </View>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionBtn}><Icon name="pencil-outline" family="material-community" size={16} color={colors.primary} /><Text style={styles.actionText}> Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><Icon name="trash-can-outline" family="material-community" size={16} color={colors.danger} /><Text style={[styles.actionText, { color: colors.danger }]}> Delete</Text></TouchableOpacity>
              </View>
            </Card>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button title={t('add_new_address') || 'Add New Address'} onPress={() => nav.navigate('AddAddress')} fullWidth size="lg" icon="plus" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  row: { flexDirection: 'row', gap: 12 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fontFamilies.bold, fontSize: fontSizes.md, color: colors.text },
  default: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.success },
  contact: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  address: { fontFamily: fontFamilies.regular, fontSize: 12, color: colors.text, marginTop: 4, lineHeight: 18 },
  actionsRow: { flexDirection: 'row', gap: 16, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.divider },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontFamily: fontFamilies.medium, fontSize: 12, color: colors.text },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, padding: 16, ...shadows.lg },
});
