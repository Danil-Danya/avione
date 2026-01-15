import { defineStore } from "pinia";
import { usePassengersApi } from "~/composables/passengers/lib/api";

export const usePassengerStore = defineStore('passengers', {
    state: () => ({
        passengers: []
    }),

    actions: {
        async fetchPassengers () {
            const { getMyPassengers } = usePassengersApi();
            this.passengers = await getMyPassengers();
        }
    }
});