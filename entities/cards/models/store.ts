import { defineStore } from "pinia";
import { useCardsApi } from "~/composables/cards/api";

export const useCardsStore = defineStore('cards', {
    state: () => ({
        cards: []
    }),

    actions: {
        async fetchCards () {
            const { getMyCards } = useCardsApi();
            this.cards = await getMyCards();
        }
    }
});