export interface AirDirection {
    departureCityId: number;
    arrivalCityId: number;
    date: string;
}

export interface AirFilter {
    directions: AirDirection[];
    airlines: number[];
    searchWithBaggage: boolean;
    class: number;
    adultCount: number;
    childCount: number;
    infantCount: number;
    refundAllowedOnly: boolean;
    maxPrice: number;
}

export interface SerializedTicket {
    id: string;
    carrierName: string;
    carrierCode: string;
    carrierLogo: string | null;
    price: number;

    departureTime: string;
    departureDate: string;
    departureCity: string;
    departureAirport: string;

    arrivalTime: string;
    arrivalDate: string;
    arrivalCity: string;
    arrivalAirport: string;

    durationMinutes: number;

    stops: number;
}

export interface ApiSegment {
    id: string;
    interLine: boolean;
    flightNumber: string;

    departureAirport: string;
    departureAirportName: string;
    departureCityName: string;
    departureDate: string;
    departureTime: string;

    arrivalAirport: string;
    arrivalAirportName: string;
    arrivalCityName: string;
    arrivalDate: string;
    arrivalTime: string;

    stops: number;
    durationMinutes: number;

    baggage: number | string;
    price: number;
    seats: number;
    class: number;

    flightInfos: any[]; 
    pccId: string;
    isDeparture: boolean;
}

export interface ApiTicketItem {
    id: string;
    carrierName: string;
    carrierCode: string;
    carrierLogo: string | null;
    minPrice: number;
    segments: ApiSegment[];
}
