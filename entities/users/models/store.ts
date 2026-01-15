import { defineStore } from "pinia";
import { useUserApi } from "../../../composables/users/lib/useApi";

export const useUserStore = defineStore('users', {
    state: () => ({
        profile: null
    }),

    actions: {
        async fetchProfile () {
            const { userProfile } = useUserApi();
            this.profile = await userProfile();
        }
    }
});