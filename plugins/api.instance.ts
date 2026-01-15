import axios from "axios";

import convertKeysToCamelCase from "@/utils/convertKeysToCamelCase";
import convertToSnakeCase from "@/utils/convertToSnakeCase";
import convertFormDataToSnakeCase from "@/utils/convertFormDataToSnakeCase";
import convertKeysToPascalCase from "~/utils/convertToPascalCase";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const api = axios.create({
        baseURL: config.public.apiBaseURL as string,
        timeout: 3000000
    });

    api.interceptors.response.use((response) => {
        if (response.status === 401) {
            // рефреш не работает временное решение
            localStorage.removeItem('accessToken');
            return;
        }

        if (response.data) {
            response.data = convertKeysToCamelCase(response.data);
        }

        return response;
    });

    api.interceptors.request.use((request) => {
        // if (request.data instanceof FormData) {
        //     request.data = convertKeysToPascalCase(request.data);
        // }
        // else if (request.data) {
        //     request.data = convertKeysToPascalCase(request.data);
        // }

        // if (request.params) {
        //     request.params = convertToSnakeCase(request.params);
        // }

        if (process.client && localStorage.getItem("accessToken")) {
            request.headers = {
                ...request.headers,
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            };
        }

        return request;
    });

    return {
        provide: {
            api
        }
    };
});
