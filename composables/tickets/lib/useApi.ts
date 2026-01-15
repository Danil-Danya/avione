import type { AirFilter } from "../models/types";

export const useTicketsApi = () => {
    const { $api } = useNuxtApp();

    const searchTickets = async (ticketFilter: AirFilter) => {
        try {
            const response = await $api.post('/air/ticket/search', ticketFilter, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchDirects = async (ticketFilter: AirFilter) => {
        try {
            const response = await $api.post('/air/ticket/search-direct-flight', ticketFilter, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const getTicketDetails = async (id: string) => {
        try {
            const response = await $api.get('/air/ticket/details', {
                params: {
                    id
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const bookTicket = async (data) => {
        try {
            const response = await $api.post('/air/ticket/book', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const paymentTicket = async (data) => {
        try {
            const response = await $api.post('/air/ticket/buy', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const applyOtpPaymentTicket = async (data) => {
        try {
            const response = await $api.post('/air/ticket/confirm-buy', data);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const getMyTickets = async () => {
        try {
            const response = await $api.get('/air/ticket/my-tickets');
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const getTicketPDF = async (id) => {
        try {
            const response = await $api.get(`/air/ticket/download-ticket/${id}`);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    const getTariffsInfo = async (id) => {
        try {
            const response = await $api.get(`/air/ticket/rules`, {
                params: {
                    buyId: id
                }
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        searchTickets,
        bookTicket,
        getTicketDetails, 
        paymentTicket,
        applyOtpPaymentTicket,
        searchDirects,
        getTicketPDF,
        getMyTickets,
        getTariffsInfo
    };
};