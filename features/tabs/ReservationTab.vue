<template>
    <div class="reservation__tab">
        <div class="reservation__tab-content">
            <div
                class="reservation__tab-item"
                v-for="(ticket, index) in selectedTickets"
                :key="ticket.segments[0].id"
                :class="{ active: isSelected(index) }"
                @click="selectTicket(index)"
            >
                <div class="reservation__tab-top">
                    <h3 class="reservation__tab-time" :class="{ active: isSelected(index) }">
                        {{formatFlightTime(ticket.segments[0].arrivalTime) }}
                    </h3>
                </div>

                <div class="reservation__tab-bottom">
                    <p
                        v-if="isSelected(index)"
                        class="reservation__tab-price active"
                    >
                        {{ $t('reservationSelected') }}
                    </p>

                    <div
                        v-else-if="isCheapest(ticket)"
                        class="reservation__tab-info cheapest"
                    >
                        <span class="reservation__tab-icon">
                            <FireIcon />
                        </span>
                        <p class="reservation__tab-price cheapest">
                            {{ formatPriceDiff(ticket) }} {{ $t('valute') }}
                        </p>
                    </div>

                    <p
                        v-else
                        class="reservation__tab-price"
                    >
                        {{ formatPriceDiff(ticket) }} {{ $t('valute') }}
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

    import { formatFlightTime } from '~/utils/formatFlightDate';

    const FireIcon = defineAsyncComponent(() => import('~/shared-ui/icons/reservation/Fire.vue'));

    const selectedTickets = ref<any[]>([]);
    const selectedIndex = ref<number>(0);

    onMounted(() => {
        const tickets = sessionStorage.getItem('selected_tickets');
        const selected = sessionStorage.getItem('selected_ticket');

        if (tickets) {
            selectedTickets.value = JSON.parse(tickets);
        }

        if (selected) {
            const parsed = JSON.parse(selected);
            const index = selectedTickets.value.findIndex(
                (t) => t.segments[0].id === parsed.segments[0].id
            );

            selectedIndex.value = index !== -1 ? index : 0;
        }
    });

    const cheapestPrice = computed(() => {
        if (!selectedTickets.value.length) {
            return null;
        }

        return Math.min(...selectedTickets.value.map(t => t.price));
    });

    const formatPriceDiff = (ticket: any) => {
        const selected = selectedTickets.value[selectedIndex.value];
        if (!selected) return formatNumber(ticket.price);

        const diff = Math.round(ticket.price - selected.price);
        if (diff === 0) return formatNumber(ticket.price); 

        const sign = diff > 0 ? '+' : '-';
        return `${sign}${formatNumber(Math.abs(diff))}`;
    };

    const selectTicket = (index: number) => {
        selectedIndex.value = index;
        sessionStorage.setItem(
            'selected_ticket',
            JSON.stringify(selectedTickets.value[index])
        );

        window.dispatchEvent(new Event('ticket-updated'));
    };

    const isSelected = (index: number) => {
        return index === selectedIndex.value;
    };

    const isCheapest = (ticket: any) => {
        return ticket.price === cheapestPrice.value;
    };

    
</script>

<style lang="scss">
    @import '@/assets/styles/features/tab/reservation-tab.scss';
</style>