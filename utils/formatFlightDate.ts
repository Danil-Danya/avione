import { useI18n } from 'vue-i18n';


const formatFlightTime = (value: string): string => {
    if (!value) {
        return "";
    }

    if (/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
        return value.slice(0, 5);
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};


const formatFlightDate = (value: string): string => {
    if (!value) return "";

    const { locale } = useI18n();
    const lang = locale.value === 'uz' ? 'uz' : 'ru';

    const monthsMap = {
        ru: [
            "янв", "фев", "мар", "апр", "мая", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ],
        uz: [
            "yan", "fev", "mar", "apr", "may", "iun",
            "iul", "avg", "sen", "okt", "noy", "dek"
        ]
    };

    const months = monthsMap[lang];

    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const day = Number(isoMatch[3]);
        const month = Number(isoMatch[2]) - 1;
        return `${day} ${months[month]}`;
    }

    const dateObj = new Date(value);
    if (!Number.isNaN(dateObj.getTime())) {
        return `${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
    }

    return "";
};


export {
    formatFlightDate,
    formatFlightTime
}
