<template>
    <div class="order__container">
        <div class="order__buttons" v-if="!isMobile">
            <Button 
                text="<"
                background="#2E4AB5"
                padding="15px 30px"
                @click="goToBack"
            />

            <RouterLink to="/" class="search__button">
                Поиск
            </RouterLink>
        </div>
        <OrderInfo />
        <div class="order__tickets">
            <TicketCard :ticket="ticket">
                <template #right>
                    <ViewTicket 
                        :baggage="ticket.segments[0].baggage"
                        :price="ticket.price"
                        :class="ticket.segments[0].cabinClass"
                        :is-hand-luggage="ticket.segments[0].handLuggage"
                    />
                </template>
            </TicketCard>
        </div>
        <div class="order__passengers">
            <PassengerCard 
                v-for="passenger in ticket.passengers" 
                :is-order="true" 
                :key="passenger" 
                :passenger="passenger"
            />
        </div>
        <Payment v-if="selectedTicket.status === 0 && !isExpired" />
    </div>
</template>

<script lang="ts" setup>

    import { useRoute, useRouter } from 'vue-router';
    import { useIsMobile } from '~/composables/useIsMobile';

    import OrderInfo from '~/shared-ui/pages/order/OrderInfo.vue';
    import ViewTicket from '~/features/actions/ViewTicket.vue';
    import PassengerCard from '~/widgets/PassengerCard.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    import Payment from '~/shared-ui/pages/reservation/Payment.vue';

    import { serializeOrderTicket } from '~/entities/tickets/models/serializer';

    const TicketCard = defineAsyncComponent(() => import('~/widgets/TicketCard.vue'));

    const ticketRaw = JSON.parse(sessionStorage.getItem('order') || '{}');
    const ticket = serializeOrderTicket(JSON.parse(sessionStorage.getItem('order')));
    const selectedTicket = ticketRaw;
    

    const router = useRouter();
    const route = useRoute();

    const isMobile = useIsMobile();

    definePageMeta({
        layout: 'profile-layout',
        ssr: false
    })


    const goToBack = () => {
        router.go(-1);
    }

    const timeLeftMs = ref(0);
    const maxDuration = 10 * 60 * 1000; 
    let timer: number;

    const updateTimeLeft = () => {
        const now = Date.now();
        const created = new Date(ticketRaw.createdDate).getTime();
        const endTime = created + maxDuration;

        const diff = endTime - now;
        timeLeftMs.value = diff > 0 ? diff : 0;
    };

    const isExpired = computed(() => timeLeftMs.value <= 0);

    onMounted(() => {
        if (selectedTicket.status === 0) {
            updateTimeLeft();
            timer = setInterval(() => {
                updateTimeLeft();
            }, 1000);
        }
    });

    onBeforeUnmount(() => {
        sessionStorage.removeItem('order');
    })

    console.log(ticket);

</script>
