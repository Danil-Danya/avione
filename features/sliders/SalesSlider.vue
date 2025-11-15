<template>
    <div class="sales__slider">
        <span class="sales__slider-button sales__slider-button--prev">
            <LeftIcon />
        </span>

        <Swiper 
            class="sales__swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="1.2"
            :autoplay="{
                delay: 3500,
                disableOnInteraction: false
            }"
            :navigation="{
                prevEl: '.sales__slider-button--prev',
                nextEl: '.sales__slider-button--next'
            }"
        >
            <SwiperSlide 
                class="sales__swiper-slide" 
                v-for="card in 10"
                :key="card"
            >
                <SalesCard />
            </SwiperSlide>
        </Swiper>

        <span class="sales__slider-button sales__slider-button--next">
            <RightIcon />
        </span>
    </div>
</template>

<script setup lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Autoplay } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    import SalesCard from '~/widgets/SalesCard.vue';

    const LeftIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Left.vue')); 
    const RightIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Right.vue'));
</script>

<style lang="scss">
    @import '~/assets/styles/features/sliders/sales-slider.scss';
</style>
