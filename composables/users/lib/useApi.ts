import axios from "axios";

export const useUserApi = () => {
    const { $api } = useNuxtApp();

    const loginUser = async (data) => {
        try {
            const response = await $api.post('/User/send-otp', data, {
                headers: {
                    "Content-Type": 'application/json',
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    // пришлось захардкодить потому что все ломается когда срок токена истечет
    const refreshUser = async (refreshToken: string) => {
        try {
            const response = await axios.post('https://new-api.avione.uz/api/User/refresh-token', { refreshToken }, {
                headers: {
                    "Content-Type": 'application/json',
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const verifyUser = async (data) => {
        try {
            const response = await $api.post('/User/verify-otp', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const userProfile = async () => {
        try {
            const response = await $api.get('/User/my-info');
            return response.data.payload;
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (data) => {
        try {
            const response = await $api.put('/User/update-my-info', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        loginUser,
        verifyUser,
        userProfile,
        updateUser,
        refreshUser
    };
};