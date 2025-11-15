<template>
    <div class="order__block">
        <OrderFilter />
        <OrderTable />
    </div>
</template>

<script lang="ts" setup>

    import OrderFilter from '~/features/filters/OrderFilter.vue';

    const OrderTable = defineAsyncComponent(() => import('~/features/tables/OrderTable.vue'));

    definePageMeta({
        layout: 'profile-layout'
    })

</script>