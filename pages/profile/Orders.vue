<template>
    <OrderTable />
</template>

<script lang="ts" setup>

    const OrderTable = defineAsyncComponent(() => import('~/features/tables/OrderTable.vue'))

    definePageMeta({
        layout: 'profile-layout'
    })

</script>