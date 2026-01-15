export const formatDateFromISO = (value: string): string => {
    if (!value || !value.includes('-')) {
        return '';
    }

    const [year, month, day] = value.split('-');

    return `${day}.${month}.${year}`;
};