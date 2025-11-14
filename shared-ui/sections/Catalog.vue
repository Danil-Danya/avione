<template>
    <section class="catalog">
        <div class="container">
            <div class="catalog__content">
                <h2 class="catalog__title">Популярные направления</h2>
                <div class="catalog__container">
                    <CatalogSlider />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

    import { defineAsyncComponent } from 'vue';
    const CatalogSlider = defineAsyncComponent(() => import(`~/features/sliders/CatalogSlider.vue`));

</script>

<style lang="scss">
    @import '~/assets/styles/shared/sections/catalog.scss';
</style>