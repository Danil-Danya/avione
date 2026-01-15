export interface Airport {
    id: number;
    name: string;
    code: string;
    cityId: number;
    countryId: number;
}

export interface City {
    id: number;
    name: string;
    code: string;
    countryId: number;
    keywords: string;
    airpors: Airport[];
}

export interface Country {
    id: number;
    name: string;
    code: string;
    phoneCode: string;
    cities: City[];
}

export interface AirportPayload {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    isFirst: boolean;
    isLast: boolean;
    data: Country[];
}

export interface AirportResponse {
    payload: AirportPayload;
    success: boolean;
}
