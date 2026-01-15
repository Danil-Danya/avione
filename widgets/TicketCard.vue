<template>
    <div class="ticket__card">
        <div class="ticket__card-left">
            <div class="ticket__card-logo">
                <img :src="ticket?.carrierLogo" alt="logo" class="ticket__card-img">
                <!-- <h3 class="ticket__card-company">
                    {{ stops === 0 ? 'Прямые рейсы' : `${stops} пересадок` }}
                </h3> -->
            </div>
            <div class="ticket__card-block-row">
                <div v-for="(segment, index) in ticket.segments"
                    :key="index"
                    class="ticket__card-block"
                >
                    <div class="ticket__card-time">
                        <p class="ticket__card-time">{{ formatFlightTime(segment.departureTime) }}</p>
                        <p class="ticket__card-date">{{ formatFlightDate(segment.departureDate) }}</p>
                    </div>
                    <div class="ticket__card-path" :class="{ 'ticket__card-path-stops': stops > 0 }">
                        <div class="ticket__card-path-top">
                            <span class="ticket__card-icon">
                                <StartAirplaneIcon />
                            </span>
                            <p class="ticket__card-text">{{ $t('durationTime') }} {{ formatDuration(segment.durationMinutes) }}</p>
                            <span class="ticket__card-icon">
                                <DownAirplaneIcon />
                            </span>
                        </div>
                        <span class="ticket__card-line line"></span>
                        <div class="ticket__card-path-bottom">
                            <p class="ticket__card-city">{{ toLatinCity(segment.departureCity) }}, {{ segment.departureAirport }}</p>
                            <p class="ticket__card-city">{{ toLatinCity(segment.arrivalCity) }}, {{ segment.arrivalAirport }}</p>
                        </div>
                    </div>
                    <div class="ticket__card-time">
                        <p class="ticket__card-time">{{ formatFlightTime(segment.arrivalTime) }}</p>
                        <p class="ticket__card-date">{{ formatFlightDate(segment.arrivalDate) }}</p>
                    </div>
                    <div
                        v-if="segment.stops > 0"
                        class="ticket__card-layover"
                    >
                        <span class="ticket__card-layover-trigger ticket__card-stops">
                            {{ formatStopsI18n(segment.stops) }}
                        </span>
                        <div class="ticket__card-layover-tooltip" v-if="segment.layovers.length">
                            <p
                                v-for="(l, i) in segment.layovers"
                                :key="i"
                            >
                                {{ formatDuration(l.durationMinutes) }}
                                {{ $t('inCity') }} {{ toLatinCity(l.city) }}
                                <span v-if="l.isNight">{{ $t('timeNight') }}</span>
                                <span v-else>{{ $t('timeDay') }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-if="route.path.includes('/reservation') && stops > 0" class="ticket__card-show-more">
                    <span class="ticket__card-layover-trigger ticket__card-stops" @click="showAllFlights = true">
                        {{ $t('ticketMoreInfo') }}
                    </span>
                </div>
            </div>
        </div>
        <div class="ticket__card-right">
            <slot
                name="right"
                :price="ticket.price"
            />
        </div>
        <FullTicketModal v-if="showAllFlights" @close="showAllFlights = false" />
    </div>
</template>

<script setup lang="ts">
    
    import { defineAsyncComponent, stop } from 'vue';

    import { formatStops } from '~/utils/formatStops';
    import { formatStopsI18n } from '~/utils/formatStopsI18n';

    const StartAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/StartAirplane.vue'));
    const DownAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/DownAirplane.vue'));

    import { formatFlightDate, formatFlightTime } from '~/utils/formatFlightDate';
    import { toLatinCity } from '~/utils/toLatinCity';
    import { formatDuration } from '~/utils/formatDuration';
    import { useRoute } from 'vue-router';

    import FullTicketModal from '~/features/modals/FullTicketModal.vue';
    
    const props = defineProps<{
        ticket: SerializedTicket;
        compact: Boolean
    }>();
    
    const route = useRoute();

    const showAllFlights = ref(false);
    const stops = computed(() => {
        return props.ticket.segments.reduce((sum, segment) => {
            return sum + (segment.stops || 0);
        }, 0);
    });

    console.log(stops.value);
    

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/ticket-card.scss';
</style>