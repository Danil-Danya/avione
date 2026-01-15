export const formatCardExpireDate = (value: string | number): string => {
    const str = String(value).padStart(4, '0');

    const month = str.slice(0, 2);
    const year = str.slice(2, 4);

    return `${month}/${year}`;
};
