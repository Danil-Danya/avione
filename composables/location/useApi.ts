export const useLocationsApi = () => {
    const { $api } = useNuxtApp();

    const  getLocations = async () => {
        try {
            const response = await $api.get('/FamousLocation');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        getLocations
    };
};