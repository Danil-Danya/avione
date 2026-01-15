export const useCountriesApi = () => {
    const { $api } = useNuxtApp();

    const getCountries = async () => {
        try {
            const response = await $api.get('/Country/filter');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        getCountries
    };
};