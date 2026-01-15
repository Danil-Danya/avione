import type { SerializedTicket, ApiTicketItem, ApiSegment } from "./types";
import { calculateBaggageInfo } from "~/utils/calculateBaggagePrice";

const toDateTime = (date: string, time: string) => {
    return new Date(`${date}T${time}`);
};

const isNightTime = (time: string) => {
    const hour = Number(time.split(":")[0]);

    return hour >= 22 || hour < 6;
};


const formatLayovers = (flights) => {
    const layovers = [];

    for (let i = 0; i < flights.length - 1; i++) {
        const current = flights[i];
        const next = flights[i + 1];

        const arrival = toDateTime(
            current.arrivalDate,
            current.arrivalTime
        );

        const departure = toDateTime(
            next.departureDate,
            next.departureTime
        );

        const diffMinutes = Math.max(
            0,
            Math.floor((departure.getTime() - arrival.getTime()) / 60000)
        );

        layovers.push({
            city: current.arrivalCity,
            durationMinutes: diffMinutes,
            isNight: isNightTime(current.arrivalTime)
        });
    }

    return layovers;
};

export const serializeFlightInfo = (info) => {
    return {
        carrierName: info.operatingAirlineName,
        carrierCode: info.operatingAirline,
        flightNumber: info.flightNumber,

        departureTime: info.departureLocalTime,
        departureDate: info.departureDate,
        departureCity: info.departureCity,
        departureAirport: info.departureAirport,

        arrivalTime: info.arrivalLocalTime,
        arrivalDate: info.arrivalDate,
        arrivalCity: info.arrivalCity,
        arrivalAirport: info.arrivalAirport,

        durationMinutes: info.flightDurationInMinutes,
        stopTimeMinutes: info.stopTimeInMinutes ?? 0,
        baggage: info.baggage ?? null
    };
};


export const serializeTicket = (
    segment: ApiSegment,
    item: ApiTicketItem
): SerializedTicket => {
    const baggage = calculateBaggageInfo([segment]);

    const flights = Array.isArray(segment.flightInfos)
        ? segment.flightInfos.map(serializeFlightInfo)
        : [];

    const layovers = formatLayovers(flights);

    const totalLayoverMinutes = layovers.reduce((sum, l) => {
        return sum + l.durationMinutes;
    }, 0);


    const flightTimeMinutes = flights.reduce((sum, f) => {
        return sum + f.durationMinutes;
    }, 0);

    return {
        carrierName: item.carrierName,
        carrierCode: item.carrierCode,
        carrierLogo: item.carrierLogo,
        price: segment.price ?? item.minPrice,
        pccId: segment.pccId,

        id: segment.id,

        departureTime: segment.departureTime,
        departureDate: segment.departureDate,
        departureCity: segment.departureCityName,
        departureAirport: segment.departureAirport,

        arrivalTime: segment.arrivalTime,
        arrivalDate: segment.arrivalDate,
        arrivalCity: segment.arrivalCityName,
        arrivalAirport: segment.arrivalAirport,

        durationMinutes: segment.durationMinutes,
        stops: segment.stops,
        baggage,

        flightTimeMinutes,
        totalLayoverMinutes,

        flights,
        layovers
    };
};


export const serializeTariff = (item) => {
    const segment = item.legs[0].segments[0];
    const fare = segment.fareFamilyData;

    return {
        id: item.id,
        price: item.price,
        title: fare.name ?? fare.nameShort ?? "Тариф",
        baggage: fare.baggageStr || null,
        handLuggage: fare.handLuggageStr || null,
        airportFrom: {
            code: segment.departureAirport,
            name: segment.departureAirportName
        },

        airportTo: {
            code: segment.arrivalAirport,
            name: segment.arrivalAirportName
        },
        services: fare.services?.map(s => ({
            name: s.name,
            status: s.status,      
            statusName: s.statusName
        })) || []
    };
};


export const serializeMyTickets = (item) => {
    const seg = item.segments?.[0];

    const mapStatus = (s) => {
        if (s === 1) return "Выписано";
        if (s === 2) return "Отменено";
        if (s === 3) return "В пути";
        return "Забронированно";
    };

    const formatPrice = (num) => {
        return Number(num).toLocaleString("ru-RU");
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}.${mm}.${yyyy}`;
    };

    return {
        cities: {
            from: seg?.departureCity?.name ?? "",
            to: seg?.arrivalCity?.name ?? ""
        },
        date: formatDate(seg?.departureDate),
        countPassenger: item.passengersCount,
        price: formatPrice(item.price),
        status: mapStatus(item.status),
        id: item.id,
        pnr: item.pnrNumber,
        orderId: item.orderId,
        order: item
    };
};

const CABIN_CLASS_MAP = {
    0: 'Эконом',
    1: 'Премиум эконом',
    2: 'Бизнес',
    3: 'Первый'
};

const parseDurationToMinutes = (duration) => {
    if (!duration) {
        return 0;
    }

    const [hours, minutes] = duration.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
};

const safeParseFlightInfos = (flightInfos) => {
    try {
        return JSON.parse(flightInfos)?.[0]?.[0];
    }
    catch {
        return null;
    }
};

// export const serializeOrderTicket = (ticket) => {
//     const flightInfo = ticket.flightInfos
//         ? safeParseFlightInfos(ticket.flightInfos)
//         : null;

//     return {
//         carrierLogo: flightInfo?.marketing_airline_logo
//             ? `https://new.etm-system.com/${flightInfo.marketing_airline_logo}`
//             : null,

//         price: ticket.price ?? 0,
//         passengers: ticket.passengers,

//         segments: ticket.segments.map((segment) => {
//             const departureDate = new Date(segment.departureDate);
//             const arrivalDate = new Date(segment.arrivalDate);

//             return {
//                 departureCity: segment.departureCity?.name ?? '',
//                 departureAirport: segment.departureAirport?.code ?? '',
                
//                 arrivalCity: segment.arrivalCity?.name ?? '',
//                 arrivalAirport: segment.arrivalAirport?.code ?? '',

//                 departureDate: departureDate.toISOString(),
//                 departureTime: departureDate.toISOString(),

//                 arrivalDate: arrivalDate.toISOString(),
//                 arrivalTime: arrivalDate.toISOString(),

//                 durationMinutes: parseDurationToMinutes(segment.duration),

//                 cabinClass: CABIN_CLASS_MAP[segment.class] ?? 'Эконом',
//                 baggage: segment.baggage ?? null,
//                 handLuggage: Boolean(segment.isHandLuggage),

//                 stops: ticket.segments.length - 1,
//                 layovers: []
//             };
//         })
//     };
// };

export const serializeOrderTicket = (ticket) => {
    const safeParseFlightInfos = (flightInfos) => {
        try {
            return JSON.parse(flightInfos);
        }
        catch {
            return [];
        }
    };

    const toDateTime = (date, time) => new Date(`${date}T${time}`);
    const isNightTime = (time) => {
        const hour = Number(time.split(":")[0]);
        return hour >= 22 || hour < 6;
    };

    const formatLayovers = (flights) => {
        const layovers = [];

        for (let i = 0; i < flights.length - 1; i++) {
            const current = flights[i];
            const next = flights[i + 1];

            const arrival = toDateTime(current.arrivalDate, current.arrivalTime);
            const departure = toDateTime(next.departureDate, next.departureTime);

            layovers.push({
                city: current.arrivalCity,
                durationMinutes: Math.max(
                    0,
                    Math.floor((departure - arrival) / 60000)
                ),
                isNight: isNightTime(current.arrivalTime)
            });
        }

        return layovers;
    };

    const flightsRaw = ticket.flightInfos
        ? safeParseFlightInfos(ticket.flightInfos)
        : [];

    const routes = flightsRaw.length ? flightsRaw : [[]];
    const legacySegments = ticket.segments ?? [];

    const segments = routes.map((routeFlights, idx) => {
        const legacySegment = legacySegments[idx] ?? {};

        const flights = routeFlights.map((f) => ({
            carrierName: f.operating_airline_name,
            carrierCode: f.operating_airline_code,
            flightNumber: f.flight_number,

            departureTime: f.departure_local_time,
            departureDate: f.departure_date,
            departureCity: f.departure_city,
            departureAirport: f.departure_airport,

            arrivalTime: f.arrival_local_time,
            arrivalDate: f.arrival_date,
            arrivalCity: f.arrival_city,
            arrivalAirport: f.arrival_airport,

            durationMinutes: f.duration_minutes,
            stopTimeMinutes: f.stop_time_minutes,

            baggage: f.baggage ?? null,
            handLuggage: Boolean(f.hand_luggage ?? f.isHandLuggage),

            cabinClass: CABIN_CLASS_MAP[f.cabin_class ?? f.class] ?? 'Эконом'
        }));

        const layovers = formatLayovers(flights);

        return {
            departureCity: flights[0]?.departureCity ?? '',
            departureAirport: flights[0]?.departureAirport ?? '',
            arrivalCity: flights.at(-1)?.arrivalCity ?? '',
            arrivalAirport: flights.at(-1)?.arrivalAirport ?? '',

            departureDate: flights[0]?.departureDate,
            departureTime: flights[0]?.departureTime,
            arrivalDate: flights.at(-1)?.arrivalDate,
            arrivalTime: flights.at(-1)?.arrivalTime,

            durationMinutes: flights.reduce((s, f) => s + f.durationMinutes, 0),
            stops: Math.max(0, flights.length - 1),

            baggage: legacySegment.baggage ?? null,
            handLuggage: Boolean(flights[0]?.handLuggage),
            cabinClass: flights[0]?.cabinClass ?? 'Эконом',

            layovers,
            flights
        };
    });


    return {
        id: ticket.id,
        orderId: ticket.orderId,
        price: ticket.price ?? 0,
        passengers: ticket.passengers,
        carrierLogo: flightsRaw?.[0]?.[0]?.marketing_airline_logo
            ? `https://new.etm-system.com/${flightsRaw[0][0].marketing_airline_logo}`
            : null,
        segments
    };
};
