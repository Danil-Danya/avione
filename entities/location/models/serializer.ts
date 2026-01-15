import type { RawRoute, Direction } from './types';

export const serializeDirections = (data: RawRoute[]): Direction[] => {
    return data?.map((item) => {
        const date = item.priceForDate.split('T')[0];

        return {
            from: item.departureCity.name,
            to: item.arrivalCity.name,
            price: item.startPrice,
            image: item.image,
            date: item.priceForDate,
            link: `/avia/${item.departureCity.name}-${item.arrivalCity.name}?from_date=${date}&adult_count=1&max_price=500000000&class=0&search_with_baggage=false`,
        };
    });
};