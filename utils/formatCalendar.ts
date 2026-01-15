const months = [
    'января','февраля','марта','апреля','мая','июня',
    'июля','августа','сентября','октября','ноября','декабря'
];

const monthsUz = [
    'yanvar','fevral','mart','aprel','may','iyun',
    'iyul','avgust','sentabr','oktabr','noyabr','dekabr'
];

export const toHumanDate = (date: Date | null, lang: 'ru' | 'uz' = 'ru'): string => {
    if (!date) return '';
    const day = date.getDate();
    const month = lang === 'uz' ? monthsUz[date.getMonth()] : months[date.getMonth()];
    return `${day} ${month}`;
};
