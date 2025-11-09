<template>
    <TicketTab />
    <Reservation />
    <Tariffs />
    <Contacts />
    <Passenger />
</template>

<script setup lang="ts">
    import TicketTab from '~/features/tabs/TicketTab.vue';
    import Reservation from '~/shared/pages/reservation/Reservation.vue';
    import Tariffs from '~/shared/pages/reservation/Tariffs.vue';
    import Contacts from '~/shared/pages/reservation/Contacts.vue';
    import Passenger from '~/shared/pages/reservation/Passenger.vue';

    definePageMeta({
        layout: 'site-layout'
    })
</script>