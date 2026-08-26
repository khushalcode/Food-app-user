/**
 * BlinkSyGold i18n
 * Loads the original Flutter app's translation files (en/hi/pa).
 * Values with embedded \n are preserved as multi-line strings.
 */
import { useEffect, useState, useCallback } from 'react';
import { AsyncStorage } from '../utils/asyncStorage';
import en from './locales/en.json';
import hi from './locales/hi.json';
import pa from './locales/pa.json';

export type Lang = 'en' | 'hi' | 'pa';

const dictionaries: Record<Lang, Record<string, string>> = {
  en: en as Record<string, string>,
  hi: hi as Record<string, string>,
  pa: pa as Record<string, string>,
};

const LANG_KEY = '@blinksy/lang';
let currentLang: Lang = 'en';
const listeners = new Set<() => void>();

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang) {
  currentLang = lang;
  AsyncStorage.setItem(LANG_KEY, lang).catch(() => {});
  listeners.forEach((l) => l());
}

export async function loadLang(): Promise<Lang> {
  const saved = await AsyncStorage.getItem<Lang>(LANG_KEY);
  if (saved && saved in dictionaries) {
    currentLang = saved;
  }
  return currentLang;
}

/**
 * Translate a key. Falls back to English, then to the key itself.
 * Supports {placeholder} interpolation via params.
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const dict = dictionaries[currentLang] || dictionaries.en;
  let value = dict[key] ?? dictionaries.en[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return value;
}

/** React hook that re-renders on language change. */
export function useTranslation() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  const translate = useCallback((key: string, params?: Record<string, string | number>) => t(key, params), []);
  return { t: translate, lang: currentLang, setLang };
}
