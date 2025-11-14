<template>
    <div class="ticket__card">
        <div class="ticket__card-left">
            <div class="ticket__card-logo">
                <img src="~/assets/images/logos/uz_airways.png" alt="logo" class="ticket__card-img">
                <h3 class="ticket__card-company">Прямые рейсы</h3>
            </div>
            <div class="ticket__card-block">
                <div class="ticket__card-time">
                    <p class="ticket__card-time">14:00</p>
                    <p class="ticket__card-date">31 авг.</p>
                </div>
                <div class="ticket__card-path">
                    <div class="ticket__card-path-top">
                        <span class="ticket__card-icon">
                            <StartAirplaneIcon />
                        </span>
                        <p class="ticket__card-text">В пути 4ч</p>
                        <span class="ticket__card-icon">
                            <DownAirplaneIcon />
                        </span>
                    </div>
                    <span class="ticket__card-line line"></span>
                    <div class="ticket__card-path-bottom">
                        <p class="ticket__card-city">TASH</p>
                        <p class="ticket__card-city">IST</p>
                    </div>
                </div>
                <div class="ticket__card-time">
                    <p class="ticket__card-time">14:00</p>
                    <p class="ticket__card-date">31 авг.</p>
                </div>
            </div>
        </div>
        <div class="ticket__card-right">
            <slot name="right" />
        </div>
    </div>
</template>

<script setup lang="ts">
    
    import { defineAsyncComponent } from 'vue';

    const StartAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/StartAirplane.vue'));
    const DownAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/DownAirplane.vue'));

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/ticket-card.scss';
</style>