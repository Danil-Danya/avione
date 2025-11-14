<template>
    <div class="catalog__card">
        <div class="catalog__card-top">
            <NuxtLink to="/avia/tashkent-moskow" class="catalog__card-link">
                <img :src="image" alt="Картинка" class="catalog__card-img">
            </NuxtLink>
        </div>
        <div class="catalog__card-bottom">
            <div class="catalog__card-place">
                <h3 class="catalog__card-cities">{{ cities }}</h3>
                <p class="catalog__card-date">{{ date }}</p>
            </div>
            <div class="catalog__card-info">
                <p class="catalog__card-price">{{ price }} сум</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    interface CatalogCard {
        cities: string;
        price: string;
        image: string;
        date: string;
    }

    const { cities, price, image, date } = defineProps<CatalogCard>();

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/catalog-card.scss';
</style>