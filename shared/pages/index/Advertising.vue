<template>
    <section class="advertising">
        <div class="container">
            <div class="advertising__content">
                <div class="advertising__sales">
                    <div class="advertising__sales-top">
                        <div class="advertising__sales-info">
                            <h3 class="advertising__title">Дешёвые авиабилеты</h3>
                            <p class="advertising__text">Успейте забронировать!</p>
                        </div>
                        <div class="advertising__sales-image">
                            <img src="~/assets/images/advertising/decor.png" alt="decor" class="advertising__sales-img">
                        </div>
                    </div>
                    <div class="advertising__sales-bottom">
                        <SalesSlider />
                    </div>
                </div>
                <div class="advertising__best">
                    <h3 class="advertising__title">Горячие туры!</h3>
                    <img src="~/assets/images/advertising/best.png" alt="" class="advertising__best-img">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';

    const SalesSlider = defineAsyncComponent(() => import('~/features/sliders/SalesSlider.vue'));

</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/advertising.scss';
</style>