<template>
    <div class="catalog__card">
        <div class="catalog__card-top">
            <NuxtLink :to="link" class="catalog__card-link">
                <img :src="image" alt="Картинка" class="catalog__card-img">
            </NuxtLink>
        </div>
        <div class="catalog__card-bottom">
            <div class="catalog__card-place">
                <h3 class="catalog__card-cities">{{ cities }}</h3>
                <p class="catalog__card-date">{{ isoToHumanDate(date) }}</p>
                <RouterLink :to="seoLink">Подробнее</RouterLink>
            </div>
            <div class="catalog__card-info">
                <p class="catalog__card-price">{{ formatNumber(price) }} {{ $t('valute') }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { isoToHumanDate } from '~/utils/formatDate';
    import { formatNumber } from '~/utils/formatNumber';

    interface CatalogCard {
        cities: string;
        price: string;
        image: string;
        date: string;
        link: string;
        seoLink: string;
    }



    const { cities, price, image, date, link } = defineProps<CatalogCard>();

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/catalog-card.scss';
</style>