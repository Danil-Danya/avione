<template>
    <Head />
    <Flight />
    <Assortment />
</template>

<script lang="ts" setup>

    import Head from '~/shared-ui/pages/from-to/Head.vue';
    import Flight from '~/shared-ui/pages/from-to/Flight.vue';
    import Assortment from '~/shared-ui/pages/from-to/Assortment.vue';

    definePageMeta({
        layout: 'site-layout'
    })

</script>