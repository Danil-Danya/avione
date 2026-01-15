import { defineStore } from "pinia";
import { useAirportsApi } from "~/composables/airports/lib/useApi";
import type { AirportResponse } from "~/entities/airports/models/types";

export const useAirportsStore = defineStore('airports', {
    state: () => ({
        airports: null as AirportResponse | null,
    }),

    actions: {
        async fetchAirports(keyword: string, pageSize: number, pageNumber: number) {
            const { getAirportsWithFilter } = useAirportsApi();

            const response = await getAirportsWithFilter(keyword, pageSize, pageNumber);

            this.airports = response;
        }
    }
});