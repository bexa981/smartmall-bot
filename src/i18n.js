import { createI18n } from 'vue-i18n';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

// Detect saved language or default to Uzbek
const savedLanguage = localStorage.getItem('language') || 'uz';

const i18n = createI18n({
  locale: savedLanguage,
  fallbackLocale: 'uz',
  messages: { uz, ru }
});

export default i18n;
