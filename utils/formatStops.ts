export const formatStops = (stops: number): string => {
    const mod100 = stops % 100;
    const mod10 = stops % 10;

    if (mod100 >= 11 && mod100 <= 14) {
        return `${stops} пересадок`;
    }

    if (mod10 === 1) {
        return `${stops} пересадка`;
    }

    if (mod10 >= 2 && mod10 <= 4) {
        return `${stops} пересадки`;
    }

    return `${stops} пересадок`;
};
