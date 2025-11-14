<template>
    <section class="assortment">
        <div class="container">
            <div class="assortment__content">
                <AirFilter />
                <div class="assortment__container">
                    <TicketCard v-for="value in 4" :key="value">
                        <template #right>
                            <BuyAction />
                        </template>
                    </TicketCard>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { defineAsyncComponent } from 'vue';

    const AirFilter = defineAsyncComponent(() => import(`~/features/filters/AirFilter.vue`));
    const TicketCard = defineAsyncComponent(() => import('~/widgets/TicketCard.vue'));
    const BuyAction = defineAsyncComponent(() => import(`~/features/actions/BuyTicket.vue`));

</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/assortment.scss';
</style>