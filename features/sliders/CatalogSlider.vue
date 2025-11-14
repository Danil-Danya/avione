<template>
    <div class="catalog__slider">
        <Swiper class="catalog__swiper"
            :modules="[Navigation, Autoplay]"
            :space-between="20"
            :loop="true"
            :centered-slides="true"
            :slides-per-view="1"
            :autoplay="{
                delay: 3500,
                disableOnInteraction: false
            }"
        >
            <SwiperSlide 
                class="catalog__slider-swiper-slide" 
                v-for="catalog in 10" :key="catalog"
            >
                <CatalogCard v-for="catalog in catalogCardList"
                    :cities="catalog.cities"
                    :image="catalog.image"
                    :price="catalog.price" 
                    :date="catalog.date"
                    :key="catalog" 
                />
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

    import CatalogCard from '~/widgets/CatalogCard.vue';

    import image1 from '~/assets/images/catalog/Rectangle 32.png';
    import image2 from '~/assets/images/catalog/Rectangle 33.png';
    import image3 from '~/assets/images/catalog/Rectangle 34.png';
    
    const catalogCardList: Ref = ref([
        {
            cities: 'Москва, Россия',
            image: image1,
            price: '2.732.850',
            date: '31 августа 14:00',
        },
        {
            cities: 'Ст-Петербург, Россия',
            image: image2,
            price: '2.950.000',
            date: '2 сентября 09:30',
        },
        {
            cities: 'Анкара, Турция',
            image: image3,
            price: '3.420.000',
            date: '5 сентября 18:45',
        },
        {
            cities: 'Сеул, Юж. Корея',
            image: image1,
            price: '6.870.000',
            date: '12 сентября 23:15',
        },
        {
            cities: 'Дубай, ОАЭ',
            image: image2,
            price: '3.890.000',
            date: '8 сентября 05:20',
        },
        {
            cities: 'Рим, Италия',
            image: image3,
            price: '7.250.000',
            date: '15 сентября 12:00',
        },
    ]);

</script>

<style lang="scss">
    @import '~/assets/styles/features/sliders/catalog-slider.scss';
</style>