<template>
    <section class="direct" v-if="displayedCompanies.length">
        <div class="direct__content">
            <div class="direct__top">
                <h2 class="direct__title title">{{ $t('sectionDirectFlights') }}</h2>
                <p class="direct__text text" @click="toggleItems">
                    {{ isExpanded ? `${$t('buttonCollapse')}` : `${$t('buttonMore')} (${ticketStore.directs.length - itemsValue})` }}
                    <BottomIcon />
                </p>
            </div>
            <transition-group name="fade-slide" tag="div" class="direct__center">
                <div class="direct__item" v-for="item in displayedCompanies" :key="item.carrierCode" @click="handleBuyClick(item)">
                    <div class="direct__item-top">
                        <div class="direct__logo">
                            <img :src="item.carrierLogo" alt="logo" class="direct__logo-img">
                            <h3 class="direct__company">{{ truncateText(item.carrierName, 7) }}</h3>
                        </div>
                        <div class="direct__price">
                            <p class="direct__price-text">{{ formatNumber(item.minPrice) }} {{ $t('valute') }}</p>
                            <RightIcon />
                        </div>
                    </div>
                    <div class="direct__item-bottom">
                        <div class="direct__timers-container">
                            <p class="direct__timers" v-for="time in item.segments" :key="time">{{ formatFlightTime(time.departureLocalTime)}}</p>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <AlertAuthModal
            v-if="isAuthAlertOpen"
            :ticket-id="authAlertTicketId"
            @close="isAuthAlertOpen = false"
            @login-success="openBookingModal(authAlertTicketId)"
        />
    </section>
</template>

<script setup lang="ts">

    import { useRouter, useRoute } from 'vue-router';

    import { useTicketStore } from '~/entities/tickets/models/store';

    import { formatNumber } from '~/utils/formatNumber';
    import { truncateText } from '~/utils/truncateText';
    import formatTime from '~/utils/formatTime';
    import { serializeTicket } from '~/entities/tickets/models/serializer';

    import AlertAuthModal from '~/features/modals/AlertAuthModal.vue';

    const BottomIcon = defineAsyncComponent(() => import('~/shared-ui/icons/direct/Bottom.vue'));
    const RightIcon = defineAsyncComponent(() => import('~/shared-ui/icons/direct/Right.vue'));

    const ticketStore = useTicketStore();
    // const times = ref(['10:10', '20:20', '30:30']);

    const itemsValue = ref(3);
    const isExpanded = ref(false);

    const router = useRouter();
    const route = useRoute()

    const displayedCompanies = computed(() => {
        const withSegments = ticketStore.directs.filter((company) => {
            return Array.isArray(company.segments) && company.segments.length > 0;
        });

        if (isExpanded.value) {
            return withSegments;
        }

        return withSegments.slice(0, itemsValue.value);
    });


    const isAuthAlertOpen = ref(false);
    const authAlertTicketId = ref<string | null>(null);

    const toggleItems = () => {
        isExpanded.value = !isExpanded.value;
    };

    const handleBuyClick = (company: any) => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        // if (!company.segments || !company.segments.length) {
        //     console.warn('Нет сегментов у выбранной компании');
        //     return;
        // }

        const serializedTickets = company.segments.map((segment: any) => ({
            price: segment.price ?? company.minPrice,
            carrierName: company.carrierName,
            carrierCode: company.carrierCode,
            carrierLogo: company.carrierLogo,
            segments: [serializeTicket(segment, company)]
        }));

        sessionStorage.setItem('selected_tickets', JSON.stringify(serializedTickets));
        sessionStorage.setItem('selected_ticket', JSON.stringify(serializedTickets[0]));

        if (!(accessToken || refreshToken)) {
            authAlertTicketId.value = company.segments[0].id;
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
                pcc: company.segments[0].pccId ?? ''
            }
        });
    };




</script>

<style lang="scss">
    @import '@/assets/styles/shared/pages/direct.scss'
</style>
