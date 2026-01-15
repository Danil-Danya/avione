export const useAirportsApi = () => {
    const { $api } = useNuxtApp();

    const getAirportsWithFilter = async (keyword: string, pageSize: number, pageNumber: number) => {
        try {
            const response = await $api.get('/Country/filter-witt-inner-data', {
                params: {
                    keyword,
                    pageSize,
                    pageNumber,
                }
            });

            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    };

    return {
        getAirportsWithFilter
    };
};
