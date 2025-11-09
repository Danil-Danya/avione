<template>
    <section class="head">
        <div class="container">
            <div class="head__content">
                <h1 class="head__title">Авиабилеты по доступным ценам - бронирование рейсов онлайн. Прямые рейсы из Узбекистана.</h1>
                <GlobalFilter class="head__filter" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import GlobalFilter from '~/features/filters/GlobalFilter.vue';
</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/head.scss';
</style>