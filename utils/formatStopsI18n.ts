import { useI18n } from 'vue-i18n';

export const formatStopsI18n = (stops: number): string => {
    const { locale } = useI18n();
    const lang = locale.value === 'uz' ? 'uz' : 'ru';

    if (stops === 0) {
        return lang === 'uz' ? 'Toʻgʻridan-toʻgʻri reyslar' : 'Прямые рейсы';
    }
    if (stops === 1) {
        return lang === 'uz' ? '1 uzatish' : '1 пересадка';
    }
    return lang === 'uz' ? `${stops} uzatishlar` : `${stops} пересадки`;
};
