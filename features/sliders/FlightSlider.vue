<template>
    <div class="flight__slider-slider">
        <Swiper class="flight__slider-swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="7"
            :autoplay="{
                delay: 3500,
                disableOnInteraction: false
            }"
            :pagination="{
                clickable: true
            }"
        >
            <SwiperSlide 
                class="flight__slider-swiper-slide" 
                v-for="card in 10" :key="card"
            >
                <FlightCard />
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup lang="ts">

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Autoplay } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    import FlightCard from '~/widgets/FlightCard.vue';

</script>

<style lang="scss">
    @use '~/assets/styles/features/sliders/flight-slider.scss';
</style>