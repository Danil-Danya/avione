<template>
    <TicketTab />
    <Reservation />
    <Contacts />
    <Passenger />
    <Payment />
</template>

<script setup lang="ts">
    import TicketTab from '~/features/tabs/TicketTab.vue';
    import Reservation from '~/shared/pages/reservation/Reservation.vue';
    import Contacts from '~/shared/pages/reservation/Contacts.vue';
    import Passenger from '~/shared/pages/reservation/Passenger.vue';
    import Payment from '~/shared/pages/reservation/Payment.vue';

    definePageMeta({
        layout: 'site-layout'
    })

</script>