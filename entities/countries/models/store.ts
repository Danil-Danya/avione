import { defineStore } from "pinia";
import { useCountriesApi } from "~/composables/countries/useApi";
export const useCountriesStore = defineStore('countries', {
    state: () => ({
        countries: []
    }),

    actions: {
        async fetchCountries () {
            const { getCountries } = useCountriesApi();
            const countries = await getCountries();

            this.countries = countries.payload.data;
        }
    }
});