import { useI18n } from 'vue-i18n';

export const formatDuration = (minutes: number): string => {
    if (!minutes || minutes <= 0) return '';

    const { locale } = useI18n();
    const lang = locale.value === 'uz' ? 'uz' : 'ru';

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    const hourLabel = lang === 'uz' ? 's' : 'ч';
    const minuteLabel = lang === 'uz' ? 'm' : 'м';

    if (h > 0 && m > 0) {
        return `${h}${hourLabel} ${m}${minuteLabel}`;
    } else if (h > 0) {
        return `${h}${hourLabel}`;
    } else {
        return `${m}${minuteLabel}`;
    }
};
