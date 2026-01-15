export const useCardsApi = () => {
    const { $api } = useNuxtApp();

    const getMyCards = async () => {
        try {
            const response = await $api.get('/Card/my-cards');
            return response.data.payload.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    // нет времени добавить типизацию
    // кто будет дорабатывать, добавь типизацию, 
    // мне поставили задачу лишь бы работало

    const createCards = async (data) => {
        try {
            const response = await $api.post('/Card/add', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const confirmCards = async (data) => {
        try {
            const response = await $api.post('/Card/add-confirm', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateCards = async (data) => {
        try {
            const response = await $api.put('/Cards/update', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteCards = async (id: number) => {
        try {
            const response = await $api.delete(`/Card/${id}`,);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        getMyCards,
        confirmCards,
        createCards,
        updateCards,
        deleteCards
    };
};