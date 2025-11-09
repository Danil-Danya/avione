<template>
    <section class="reservation">
        <div class="container">
            <div class="reservation__content">
                <TicketCard class="reservation__ticket">
                    <template #right>
                        <ViewTicket />
                    </template>
                </TicketCard>
                <CheckCard />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const TicketCard = defineAsyncComponent(() => import('~/widgets/TicketCard.vue'));
    const ViewTicket = defineAsyncComponent(() => import('~/features/actions/ViewTicket.vue'));

    import CheckCard from '~/widgets/CheckCard.vue';
</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/reservation.scss';
</style>