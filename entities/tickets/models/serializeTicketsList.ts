import type { ApiTicketItem, SerializedTicket } from "./types";
import { serializeTicket, serializeTariff } from "./serializer";

import type { ApiTicketItem } from "./types";
import { serializeTicket, serializeTariff } from "./serializer";

export const serializeTicketsList = (
    items: ApiTicketItem[],
    filter: any
): any[] => {
    const result: any[] = [];

    const isRoundTrip = filter.directions.length === 2;

    for (const item of items) {
        const segments = item.segments?.[0];

        if (!Array.isArray(segments) || segments.length === 0) {
            continue;
        }

        if (!isRoundTrip) {
            for (const segment of segments) {
                result.push({
                    price: segment.price ?? item.minPrice,
                    carrierName: item.carrierName,
                    carrierCode: item.carrierCode,
                    carrierLogo: item.carrierLogo,
                    segments: [
                        serializeTicket(segment, item)
                    ]
                });
            }

            continue;
        }

        const reference = segments[0];

        const outbounds: any[] = [];
        const inbounds: any[] = [];

        for (const segment of segments) {
            if (
                segment.departureCityName === reference.departureCityName &&
                segment.arrivalCityName === reference.arrivalCityName
            ) {
                outbounds.push(segment);
            }
            else if (
                segment.departureCityName === reference.arrivalCityName &&
                segment.arrivalCityName === reference.departureCityName
            ) {
                inbounds.push(segment);
            }
        }

        for (const out of outbounds) {
            for (const back of inbounds) {
                result.push({
                    price: item.minPrice,
                    carrierName: item.carrierName,
                    carrierCode: item.carrierCode,
                    carrierLogo: item.carrierLogo,
                    segments: [
                        serializeTicket(out, item),
                        serializeTicket(back, item)
                    ]
                });
            }
        }
    }

    return result;
};


export const serializeTariffsList = (items) =>
    items.map(serializeTariff);

