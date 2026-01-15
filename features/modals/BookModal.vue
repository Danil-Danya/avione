<template>
    <section class="booking__modal">
        <div class="booking__modal-overlay" @click="close" />

        <div class="booking__modal-content">
            <div class="booking__modal-header">
                <h2 class="booking__modal-title">Бронирование билета</h2>
            </div>

            <div v-if="ticket" class="booking__modal-ticket">
                <TicketCard 
                    :ticket="ticket"
                    :key="ticket.id"
                >
                    <template #right="{ price, baggage }">
                        <BuyTicket
                            :id="ticket.id"
                            :price="ticket.price"
                            :baggage="ticket.baggage"
                        />
                    </template>
                </TicketCard>
            </div>


            <div class="booking__modal-body">
                <p class="booking__modal-text">
                    Здесь вы сможете утвердить ваш билет и перейти к расшириным настройкам
                </p>
            </div>

            <div class="booking__modal-actions">
                <Button
                    padding="12px 36px"
                    background="#2E4AB5"
                    text="Продолжить"
                    @click="goToReservation"
                />

                <Button
                    padding="12px 36px"
                    background="#EE2532"
                    text="Отмена"
                    @click="close"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { useTicketStore } from '~/entities/tickets/models/store';
    import { useRouter, useRoute } from 'vue-router';

    import TicketCard from '~/widgets/TicketCard.vue';
    import BuyTicket from '../actions/BuyTicket.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const router = useRouter();
    const route = useRoute();

    const emit = defineEmits(['close']);
    const close = () => emit('close');

    const ticketStore = useTicketStore();
    
    const ticket = computed(() => JSON.parse(sessionStorage.getItem('selected_ticket')));
    
    const goToReservation = () => {
        router.push({
            path: '/reservation',
            query: {
                adult_count: route.query.adult_count,
                child_count: route.query.child_count,
                infant_count: route.query.infant_count,
                class: route.query.class
            }
        })
    }

</script>

<style lang="scss">
    @import '@/assets/styles/features/modals/books.scss';
</style>