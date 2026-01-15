<template>
    <section class="assortment">
        <div class="container">
            <div class="assortment__content">
                <AirFilter v-if="!isMobile" />
                <Button text="Показать фильтр" padding="10px" background="#2E4AB5" @click="toggleFilter" v-else />
                <div class="assortment__container">
                    <Direct v-if="ticketStore.directs.length && !route.query.to_date && ticketStore.tickets.length" />
                    <TicketCard v-if="ticketStore.tickets.length"
                        v-for="ticket in ticketStore.tickets"
                        :ticket="ticket"
                        :key="ticket.id"
                    >
                        <template #right="{ price }" v-if="ticketStore.tickets">
                            <BuyAction
                                @buy="handleBuyClick(ticket)"
                                :price="price"
                            />
                        </template>
                    </TicketCard>
                    
                    <TicketCardSkelet v-for="value in 4" :key="value" v-else />
                </div>
            </div>
        </div>
        <AlertAuthModal
            v-if="isAuthAlertOpen"
            :ticket-id="authAlertTicketId"
            @close="isAuthAlertOpen = false"
            @login-success="openBookingModal(authAlertTicketId)"
        />
        <Transition name="filter-modal">
            <Suspense>
                <AirFilterModal v-if="showFilterModal" @close-modal="toggleFilter" />
            </Suspense>
        </Transition>
    </section>
</template>

<script setup lang="ts">

    import { useRoute, useRouter } from 'vue-router';
    import { defineAsyncComponent } from 'vue';
    import { useIsMobile } from '~/composables/useIsMobile';
    import { useTicketStore } from '~/entities/tickets/models/store';
    import { serializeTicket } from '~/entities/tickets/models/serializer';

    import Button from '~/shared-ui/ui/Button.vue';
    import AirFilterModal from '~/features/modals/AirFilterModal.vue';
    import TicketCardSkelet from '~/features/preloaders/TicketCardSkelet.vue';
    import AlertAuthModal from '~/features/modals/AlertAuthModal.vue';
    import BookModal from '~/features/modals/BookModal.vue';
    import AirFilter from '~/features/filters/AirFilter.vue';
    import Direct from './Direct.vue';

    const router = useRouter();
    const route = useRoute();

    // const AirFilter = defineAsyncComponent(() => import(`~/features/filters/AirFilter.vue`));
    const TicketCard = defineAsyncComponent(() => import('~/widgets/TicketCard.vue'));
    const BuyAction = defineAsyncComponent(() => import(`~/features/actions/BuyTicket.vue`));

    const showFilterModal = computed(() => isMobile.value && isActiveFilter.value);

    const ticketStore = useTicketStore();

    const isMobile: Ref<boolean> = useIsMobile();
    const isActiveFilter: Ref<Boolean> = ref(false);

    const isAuthAlertOpen = ref(false);
    const authAlertTicketId = ref<string | null>(null);

    const handleBuyClick = (ticket: object) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        sessionStorage.setItem('selected_ticket', JSON.stringify(ticket));

        if (!(accessToken || refreshToken)) {
            authAlertTicketId.value = ticket.id;
            isAuthAlertOpen.value = true;

            return;
        }

        router.push({
            path: '/reservation',
            query: {
                adult_count: route.query.adult_count,
                child_count: route.query.child_count,
                infant_count: route.query.infant_count,
                class: route.query.class,
                pcc: ticket.segments[0].pccId
            }
        })
    };

    const openBookingModal = (ticketId: string) => {
        if (!ticketId) {
            return;
        }

        router.replace({
            query: {
                ...route.query,
                ticket_id: ticketId
            }
        });
    };

    watch(
        () => ticketStore.tickets,
        (newVal, oldVal) => {
            console.log("TICKETS UPDATED");
            console.log("OLD:", oldVal);
            console.log("NEW:", newVal);
        },
        { deep: true }
    );

    const toggleFilter = () => {
        isActiveFilter.value = !isActiveFilter.value;

        nextTick(() => {
            const body = document.querySelector('body');

            if (isActiveFilter.value) {
                body.style.overflow = 'hidden';
            }
            else {
                body.style.overflow = 'auto';
            }
        });
    };

</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/assortment.scss';
</style>