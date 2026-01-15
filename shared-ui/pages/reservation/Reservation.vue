<template>
    <section class="reservation">
        <div class="container">
            <div class="reservation__container">
                <ReservationTab />
            </div>
            <ClientOnly>
                <div class="reservation__content" v-if="ticket">
                    <TicketCard class="reservation__ticket" :ticket="ticket" />
                    <CheckCard 
                        :price="ticket.price" 
                        :carrier-name="ticket.carrierName"
                    />
                </div>
            </ClientOnly>
        </div>
    </section>
</template>

<script setup lang="ts">

    import CheckCard from '~/widgets/CheckCard.vue';
    import ReservationTab from '~/features/tabs/ReservationTab.vue';

    const TicketCard = defineAsyncComponent(() => import('~/widgets/TicketCard.vue'));
    const ViewTicket = defineAsyncComponent(() => import('~/features/actions/ViewTicket.vue'));

    const selectedTickets = computed(() => JSON.parse(sessionStorage.getItem('selected_tickets')));

    const ticket = ref<any | null>(null);

    const loadTicket = () => {
        const raw = sessionStorage.getItem("selected_ticket");
        ticket.value = raw ? JSON.parse(raw) : null;
    };

    const handleTicketUpdated = () => {
        loadTicket();
    };

    onMounted(() => {
        loadTicket();
        window.addEventListener("ticket-updated", handleTicketUpdated);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("ticket-updated", handleTicketUpdated);
        sessionStorage.removeItem('selected_tickets');
        sessionStorage.removeItem('selected_ticket');
    });
    
</script>



<style lang="scss">
    @import '~/assets/styles/shared/pages/reservation.scss';
</style>