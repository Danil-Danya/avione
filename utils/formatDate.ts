import { useI18n } from 'vue-i18n';

const months = {
  ru: [
    'января','февраля','марта','апреля','мая','июня',
    'июля','августа','сентября','октября','ноября','декабря'
  ],
  uz: [
    'yanvar','fevral','mart','aprel','may','iyun',
    'iyul','avgust','sentabr','oktabr','noyabr','dekabr'
  ]
};

const toUrlDate = (date: Date | null) => {
  if (!date) return null;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
};


const toHumanDate = (date: Date | null): string => {
  if (!date) return '';

  const { locale } = useI18n();
  const lang = locale.value === 'uz' ? 'uz' : 'ru';
  const day = date.getDate();
  const month = months[lang][date.getMonth()];

  return `${day} ${month}`;
};

const formatDateToISO = (value: string): string | null => {
  if (!value) return null;

  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;

  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
};

const isoToHumanDate = (iso: string | null): string => {
  if (!iso) return '';

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  const { locale } = useI18n(); 
  const lang = locale.value === 'uz' ? 'uz' : 'ru'; 
  const day = date.getDate();
  const month = months[lang][date.getMonth()];

  return `${day} ${month}`;
};

export {
  toHumanDate,
  formatDateToISO,
  toUrlDate,
  isoToHumanDate
};
