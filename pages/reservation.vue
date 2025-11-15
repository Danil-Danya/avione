<template>
    <TicketTab />
    <Reservation />
    <Tariffs />
    <Contacts />
    <Passenger />
</template>

<script setup lang="ts">

    import TicketTab from '~/features/tabs/TicketTab.vue';
    import Reservation from '~/shared-ui/pages/reservation/Reservation.vue';
    import Tariffs from '~/shared-ui/pages/reservation/Tariffs.vue';
    import Contacts from '~/shared-ui/pages/reservation/Contacts.vue';
    import Passenger from '~/shared-ui/pages/reservation/Passenger.vue';

    definePageMeta({
        layout: 'site-layout'
    })

</script>