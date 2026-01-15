<template>
    <div class="flight__slider">
        <span class="flight__slider-button flight__slider-button--prev">
            <LeftIcon />
        </span>

        <Swiper 
            class="flight__slider-swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="slidesCounts"
            :autoplay="{
                delay: 3500,
                disableOnInteraction: false
            }"
            :navigation="{
                prevEl: '.flight__slider-button--prev',
                nextEl: '.flight__slider-button--next'
            }"
        >
            <SwiperSlide 
                class="flight__slider-swiper-slide" 
                v-for="card in 10"
                :key="card"
            >
                <FlightCard />
            </SwiperSlide>
        </Swiper>

        <span class="flight__slider-button flight__slider-button--next">
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

    import FlightCard from '~/widgets/FlightCard.vue';

    const slidesCounts: Ref<number> = ref(7);

    const checkCountSlides = () => {
        const clientWidth = window.innerWidth;
        switch (true) {
            case clientWidth < 450: {
                slidesCounts.value = 1;
                break;
            }
            
            case clientWidth < 650: {
                slidesCounts.value = 2;
                break;
            }

            case clientWidth < 750: {
                slidesCounts.value = 3;
                break;
            }

            case clientWidth < 1000: {
                slidesCounts.value = 4;
                break;
            }

            default: {
                slidesCounts.value = 7;
                break;
            }
        }
    }

    const LeftIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Left.vue')); 
    const RightIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Right.vue'));

    onMounted(() => {
        checkCountSlides();
        window.addEventListener('resize', () => checkCountSlides());
    })

</script>

<style lang="scss">
    @import '~/assets/styles/features/sliders/flight-slider.scss';
</style>
