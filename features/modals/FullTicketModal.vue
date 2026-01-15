<template>
    <section class="alert__modal">
        <div class="alert__modal-overlay" @click="close" />

        <div class="modal-content">
            <div class="ticket__card">
                <div class="ticket__card-left">
                    <div class="ticket__card-logo">
                        <img :src="ticket?.carrierLogo" alt="logo" class="ticket__card-img">
                    </div>
                    <div class="ticket__card-block-row-info">
                        <div v-for="(segment, sIndex) in ticket.segments" :key="sIndex" class="ticket__card-info">
                            <template v-for="(flight, fIndex) in segment.flights" :key="fIndex">
                                <div class="ticket__card-block">
                                    <div class="ticket__card-time">
                                        <p class="ticket__card-time">{{ flight.departureTime }}</p>
                                        <p class="ticket__card-date">{{ formatFlightDate(flight.departureDate) }}</p>
                                    </div>
    
                                    <div class="ticket__card-path">
                                        <div class="ticket__card-path-top">
                                            <span class="ticket__card-icon"><StartAirplaneIcon /></span>
                                            <p class="ticket__card-text">
                                                {{ $t('durationTime') }} {{ formatDuration(flight.durationMinutes) }}
                                            </p>
                                            <span class="ticket__card-icon"><DownAirplaneIcon /></span>
                                        </div>
                                        <span class="ticket__card-line line"></span>
                                        <div class="ticket__card-path-bottom">
                                            <p class="ticket__card-city">{{ toLatinCity(flight.departureCity) }}, {{ flight.departureAirport }}</p>
                                            <p class="ticket__card-city">{{ toLatinCity(flight.arrivalCity) }}, {{ flight.arrivalAirport }}</p>
                                        </div>
                                    </div>
    
                                    <div class="ticket__card-time">
                                        <p class="ticket__card-time">{{ flight.arrivalTime }}</p>
                                        <p class="ticket__card-date">{{ formatFlightDate(flight.arrivalDate) }}</p>
                                    </div>
                                </div>
    
                                <div
                                    v-if="fIndex < segment.flights.length - 1"
                                    class="ticket__card-layover-info"
                                >
                                    <span class="ticket__card-layover-text">
                                        {{ formatStopsI18n(segment.stops) }}
                                        {{ formatDuration(segment.layovers[fIndex]?.durationMinutes) }}
                                        <span v-if="!segment.layovers[fIndex]?.isNight">{{ $t('timeDay') }}</span>
                                        <span v-else>{{ $t('timeNight') }}</span>
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                <Button class="modal-actions-button"
                    padding="12px 36px"
                    :text="$t('alertOk')"
                    background="#2E4AB5"
                    @click="handleClose"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDuration } from '~/utils/formatDuration';
import { toLatinCity } from '~/utils/toLatinCity';
import { formatFlightDate } from '~/utils/formatFlightDate';
import { defineAsyncComponent } from 'vue';
import { formatStopsI18n } from '~/utils/formatStopsI18n';

import Button from '@/shared-ui/ui/Button.vue';

const StartAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/StartAirplane.vue'));
const DownAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/DownAirplane.vue'));

const ticket = computed(() => {
    const stored = sessionStorage.getItem('selected_ticket');
    if (!stored) return null;
    const parsed = JSON.parse(stored);

    parsed.segments.forEach((segment: any) => {
        if (!segment.flights || segment.flights.length < 2) return;

        segment.layovers = [];
        for (let i = 0; i < segment.flights.length - 1; i++) {
            const prev = segment.flights[i];
            const next = segment.flights[i + 1];

            const prevArrival = new Date(`${prev.arrivalDate}T${prev.arrivalTime}`);
            const nextDeparture = new Date(`${next.departureDate}T${next.departureTime}`);

            const durationMs = nextDeparture.getTime() - prevArrival.getTime();
            const durationMinutes = Math.floor(durationMs / 60000);

            const isNight = prevArrival.getHours() >= 20 || prevArrival.getHours() < 6;

            segment.layovers.push({
                city: prev.arrivalCity,
                durationMinutes,
                isNight
            });
        }
    });

    
    return parsed;
});

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};

</script>

<style lang="scss">
@import '@/assets/styles/features/modals/alert.scss';
</style>
