/**
 * Live Chat — message thread with support agent.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput as RNTextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MenuStackParamList } from '../../navigation';
import { colors, fontFamilies, fontSizes, shadows } from '../../theme/theme';
import { useTranslation } from '../../i18n';
import { Header, Icon } from '../../components';

type Msg = { id: string; from: 'me' | 'agent'; text: string; time: string };

export function LiveChat() {
  const { t } = useTranslation();
  const nav = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();
  const [messages, setMessages] = useState<Msg[]>([
    { id: '1', from: 'agent', text: 'Hi! Welcome to BlinkSyGold support. How can I help you today?', time: '10:32' },
    { id: '2', from: 'me', text: 'Hi, I want to know the status of my order ORD-7841.', time: '10:33' },
    { id: '3', from: 'agent', text: 'Sure! Your order is being prepared and will be out for delivery in ~10 minutes.', time: '10:33' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now()), from: 'agent', text: 'Is there anything else I can help you with?', time: '10:35' }]);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const msg: Msg = { id: String(Date.now()), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString().slice(0, 5) };
    setMessages((m) => [...m, msg]);
    setInput('');
    // Auto-reply
    setTimeout(() => {
      setMessages((m) => [...m, { id: String(Date.now() + 1), from: 'agent', text: 'Thanks for your message. Our team will get back to you shortly.', time: new Date().toLocaleTimeString().slice(0, 5) }]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title="Live Chat" subtitle="BlinkSyGold Support" onBack={() => nav.goBack()} right={<View style={styles.onlineDot} />} />
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        inverted={false}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.from === 'me' ? styles.msgMe : styles.msgAgent]}>
            <Text style={[styles.msgText, item.from === 'me' ? styles.msgTextMe : styles.msgTextAgent]}>{item.text}</Text>
            <Text style={[styles.msgTime, item.from === 'me' ? styles.msgTimeMe : styles.msgTimeAgent]}>{item.time}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputBar}>
          <RNTextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.textTertiary}
            style={styles.input}
            multiline
          />
          <TouchableOpacity onPress={send} style={styles.sendBtn}>
            <Icon name="send" family="material-community" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  onlineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.success },
  msgBubble: { maxWidth: '80%', padding: 10, borderRadius: 12 },
  msgMe: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  msgAgent: { alignSelf: 'flex-start', backgroundColor: colors.white, borderBottomLeftRadius: 4, ...shadows.sm },
  msgText: { fontFamily: fontFamilies.regular, fontSize: fontSizes.md, lineHeight: 20 },
  msgTextMe: { color: colors.white },
  msgTextAgent: { color: colors.text },
  msgTime: { fontFamily: fontFamilies.regular, fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  msgTimeMe: { color: 'rgba(255,255,255,0.7)' },
  msgTimeAgent: { color: colors.textTertiary },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, padding: 12, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.divider },
  input: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontFamily: fontFamilies.regular, fontSize: fontSizes.md, color: colors.text, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
