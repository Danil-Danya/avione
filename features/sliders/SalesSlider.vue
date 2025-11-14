<template>
    <div class="sales__slider">
        <Swiper class="sales__swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="1.2"
            :autoplay="{
                delay: 3500,
                disableOnInteraction: false
            }"
            :pagination="{
                clickable: true
            }"
        >
            <SwiperSlide 
                class="sales__swiper-slide" 
                v-for="card in 10" :key="card"
            >
                <SalesCard />
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

    import SalesCard from '~/widgets/SalesCard.vue';

</script>

<style lang="scss">
    @import '~/assets/styles/features/sliders/sales-slider.scss';
</style>