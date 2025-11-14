<template>
    <section class="flight">
        <div class="container">
            <div class="flight__content">
                <FlightSlider />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const FlightSlider = defineAsyncComponent(() => import('~/features/sliders/FlightSlider.vue'));
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/flight.scss';
</style>