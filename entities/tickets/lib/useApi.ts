import type { AirFilter } from "../models/types";

export const useTicketsApi = () => {
    const { $api } = useNuxtApp();

    const searchTickets = async (ticketFilter: AirFilter) => {
        try {
            const response = await $api.post('/air/ticket/search', ticketFilter, {
                headers: {
                    "Content-Type": "application/json-patch+json"
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        searchTickets
    };
};