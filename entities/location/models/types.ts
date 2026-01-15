export type RawRoute = {
    departureCity: {
        name: string;
    };
    arrivalCity: {
        name: string;
    };
    startPrice: number;
    image: string;
};

export type Direction = {
    from: string;
    to: string;
    price: number;
    date: string;
    image: string;
    link: string;
};