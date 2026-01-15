export const formatNumber = (value: number | string): string => {
    const num = typeof value === 'number'
        ? value
        : Number(String(value).replace(',', '.'));

    if (Number.isNaN(num)) {
        return '';
    }

    return num
        .toFixed(2) 
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

