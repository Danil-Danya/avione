export const usePassengersApi = () => {
    const { $api } = useNuxtApp();

    const getMyPassengers = async () => {
        try {
            const response = await $api.get('/Passenger/my-passengers');
            return response.data.payload.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    // нет времени добавить типизацию
    // кто будет дорабатывать, добавь типизацию, 
    // мне поставили задачу лишь бы работало

    const createPassenger = async (data) => {
        try {
            const response = await $api.post('/Passenger/add', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const updatePassenger = async (data) => {
        try {
            const response = await $api.put('/Passenger/update', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const deletePassenger = async (id: number) => {
        try {
            const response = await $api.delete(`/Passenger/${id}`, id);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        getMyPassengers,
        createPassenger,
        updatePassenger,
        deletePassenger
    };
};