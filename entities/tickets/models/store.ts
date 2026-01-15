import { defineStore } from "pinia";
import { useTicketsApi } from "~/composables/tickets/lib/useApi";
import type { AirFilter } from "./types";
import { serializeTicketsList, serializeTariffsList } from "./serializeTicketsList";

import { serializeMyTickets } from "./serializer";

export const useTicketStore = defineStore('tickets', {
    state: () => ({
        tickets: [] as any[],
        myTickets: [],
        directs: [],
        tariffs: [],
        tariffsInfo: null,
    }),

    actions: {
        async fetchTickets(filter: AirFilter) {
            const { searchTickets } = useTicketsApi();

            const response = await searchTickets(filter);

            if (response?.payload?.data) {
                this.tickets = serializeTicketsList(
                    response.payload.data,
                    filter
                ).sort((a, b) => a.price - b.price);
            }
        },

        async fetchTariffs(id: string) {
            const { getTicketDetails } = useTicketsApi();

            const res = await getTicketDetails(id);

            if (!res?.payload) {
                return null;
            }
            
            this.tariffs = serializeTariffsList(res.payload.data);
        },

        async fetchDirects (filter) {
            const { searchDirects } = useTicketsApi();

            const response = await searchDirects(filter);
            this.directs = response.payload.data;
        },

        async fetchMyTickets () {
            const { getMyTickets } = useTicketsApi();

            const res = await getMyTickets();

            const list = res?.payload?.data;

            if (!Array.isArray(list)) {
                this.myTickets = [];
                return;
            }

            this.myTickets = list.map(serializeMyTickets);
        },

        async fetchTariffsInfo (id) {
            const { getTariffsInfo } = useTicketsApi();

            const res = await getTariffsInfo(id);

            this.tariffsInfo = res.payload;
        }
    }
});
