<template>
    <div class="sales__card">
        <div class="sales__card-top">
            <div class="sales__card-logo">
                <img src="~/assets/images/logos/uz_airways.png" alt="logo" class="sales__card-img">
            </div>
            <div class="sales__card-info">
                <p class="sales__card-price">2.032.400 сум</p>
                <p class="sales__card-cities">Ташкент - Стамбул</p>
            </div>
            <div class="sales__card-original">
                <p class="sales__card-price-original">2.732.850 сум</p>
            </div>
        </div>
        <div class="sales__card-bottom">
            <div class="sales__card-time">
                <p class="sales__card-time">14:00</p>
                <p class="sales__card-date">31 авг.</p>
            </div>
            <div class="sales__card-path">
                <div class="sales__card-path-top">
                    <span class="sales__card-icon">
                        <StartAirplaneIcon />
                    </span>
                    <p class="sales__card-text">В пути 4ч</p>
                    <span class="sales__card-icon">
                        <DownAirplaneIcon />
                    </span>
                </div>
                <span class="sales__card-line line"></span>
                <div class="sales__card-path-bottom">
                    <p class="sales__card-city">TASH</p>
                    <p class="sales__card-city">IST</p>
                </div>
            </div>
            <div class="sales__card-time">
                <p class="sales__card-time">14:00</p>
                <p class="sales__card-date">31 авг.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
    import { defineAsyncComponent } from 'vue';

    const StartAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/StartAirplane.vue'));
    const DownAirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/DownAirplane.vue'));

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/sales-card.scss';
</style>