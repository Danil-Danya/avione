import { defineStore } from "pinia";
import { useLocationsApi } from "../../../composables/location/useApi";
import { serializeDirections } from "./serializer";

export const useLocationsStore = defineStore('locations', {
    state: () => ({
        locations: []
    }),

    actions: {
        async fetchLocations () {
            const { getLocations } = useLocationsApi();
            const locations = await getLocations();

            this.locations = serializeDirections(locations?.payload?.data);
        }
    }
});