<template>
    <section class="head head-seo">
        <div class="container">
            <div class="head__content">
                <h1 class="head__title">{{ $t('headerTitle') }}</h1>
                <GlobalFilter class="head__filter" />

                <!-- для сео -->
                <NuxtLink
                    v-if="locale === 'ru'"
                    :to="`/uz${route.fullPath.replace(/^\/(ru|uz)/, '')}`"
                    style="position:absolute; left:-9999px; top:-9999px;"
                >Uzbek version</NuxtLink>

                <NuxtLink
                    v-else
                    :to="`/ru${route.fullPath.replace(/^\/(ru|uz)/, '')}`"
                    style="position:absolute; left:-9999px; top:-9999px;"
                >Russian version</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import GlobalFilter from '~/features/filters/GlobalFilter.vue';
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();
    const route = useRoute();
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/head.scss';
</style>