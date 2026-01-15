<template>
    <div class="order__block">
        <OrderFilter />
        <OrderTable :table-list="ticketsStore.myTickets" />
    </div>
</template>

<script lang="ts" setup>

    import OrderFilter from '~/features/filters/OrderFilter.vue';
    import { useTicketStore } from '~/entities/tickets/models/store';

    const ticketsStore = useTicketStore();

    const OrderTable = defineAsyncComponent(() => import('~/features/tables/OrderTable.vue'));

    await ticketsStore.fetchMyTickets();

    definePageMeta({
        layout: 'profile-layout',
    })

</script>