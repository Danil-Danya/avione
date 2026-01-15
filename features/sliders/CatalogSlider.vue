<template>
    <div class="catalog__slider">
        <span class="catalog__slider-button catalog__slider-button--prev">
            <LeftIcon />
        </span>

        <Swiper
            class="catalog__swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="1"
            :autoplay="autoplayOptions"
            :navigation="{
                prevEl: '.catalog__slider-button--prev',
                nextEl: '.catalog__slider-button--next'
            }"
        >
            <SwiperSlide
                class="catalog__slider-swiper-slide"
                v-for="catalog in 1"
                :key="catalog"
            >
                <CatalogCard v-if="locationsStore?.locations?.length"
                    v-for="catalog in locationsStore?.locations"
                    :cities="`${toLatinCity(catalog.from)}, ${toLatinCity(catalog.to)}`"
                    :image="catalog.image"
                    :price="catalog.price"
                    :date="catalog.date"
                    :link="catalog.link"
                    :seo-link="`/napravlenie/tashkent/${toLatinCityDefault(catalog.to).toLowerCase()}`"
                    :key="catalog"
                />
            </SwiperSlide>
        </Swiper>

        <span class="catalog__slider-button catalog__slider-button--next">
            <RightIcon />
        </span>
    </div>
</template>

<script setup lang="ts">

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Autoplay } from 'swiper/modules';
    import { useLocationsStore } from '~/entities/location/models/store';
    import { toLatinCityDefault } from '~/utils/toLatinCity';

    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    import CatalogCard from '~/widgets/CatalogCard.vue';
    
    // import image1 from '~/assets/images/catalog/Rectangle 32.png';
    // import image2 from '~/assets/images/catalog/Rectangle 33.png';
    // import image3 from '~/assets/images/catalog/Rectangle 34.png';

    const LeftIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Left.vue')); 
    const RightIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sliders/Right.vue'));

    const autoplayOptions = ref<any>({
        delay: 3500,
        disableOnInteraction: false
    });

    const locationsStore = useLocationsStore();
    await locationsStore.fetchLocations();

    const isReady = ref(false);
    
    onMounted(() => {
        if (window.innerWidth < 990) {
            autoplayOptions.value = false;
        }

        isReady.value = true;

        setTimeout(async () => {
            await locationsStore.fetchLocations()
        }, 1000)
    });

</script>

<style lang="scss">
    @import '~/assets/styles/features/sliders/catalog-slider.scss';
</style>