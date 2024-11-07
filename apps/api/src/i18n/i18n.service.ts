import { Injectable } from '@nestjs/common';
import { messages } from './i18n.message';

type LanguageCode = 'en' | 'es';

@Injectable()
export class I18nService {
  private language: LanguageCode = 'en'; // Default language

  setLanguage(lang: LanguageCode) {
    this.language = lang;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let translated: any = messages[this.language];

    for (const k of keys) {
      if (translated[k] === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation is not found
      }
      translated = translated[k];
    }

    return translated;
  }
}
