<template>
    <section class="head">
        <div class="container">
            <div class="head__content">
                <GlobalFilter class="head__filter-from-to" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import GlobalFilter from '~/features/filters/GlobalFilter.vue';
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/head.scss';
</style>