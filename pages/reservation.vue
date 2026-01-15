<template>
    <ClientOnly>
        <TicketTab />
        <Reservation />
        <Tariffs  v-if="!route.query.reservation_id" />
        <Contacts />
        <Passenger />
        <Payment v-if="route.query.reservation_id" />
    </ClientOnly>
</template>

<script setup lang="ts">

    import TicketTab from '~/features/tabs/TicketTab.vue';
    import Reservation from '~/shared-ui/pages/reservation/Reservation.vue';
    import Tariffs from '~/shared-ui/pages/reservation/Tariffs.vue';
    import Contacts from '~/shared-ui/pages/reservation/Contacts.vue';
    import Passenger from '~/shared-ui/pages/reservation/Passenger.vue';
    import Payment from '~/shared-ui/pages/reservation/Payment.vue';

    import { useTicketStore } from '~/entities/tickets/models/store';
    import { useRoute } from 'vue-router';
    

    const ticketStore = useTicketStore();
    const route = useRoute();

    const loadTariffs = async () => {
        const raw = sessionStorage.getItem('selected_ticket');
        if (!raw) {
            return;
        }

        const ticket = JSON.parse(raw);

        //await ticketStore.fetchTariffs(); 

        await ticketStore.fetchTariffs(ticket.segments[0].id);

        if (ticket.segments[1]) {
            await ticketStore.fetchTariffs(ticket.segments[1].id);
        }
    };

    const handleTicketUpdated = async () => {
        await loadTariffs();
    };

    onMounted(async () => {
        await loadTariffs();
        window.addEventListener('ticket-updated', handleTicketUpdated);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('ticket-updated', handleTicketUpdated);
    });


    definePageMeta({
        layout: 'site-layout',
        ssr: false
    })

</script>