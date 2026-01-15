<template>
    <section class="head head-seo">
        <div class="container">
            <div class="head__content head__content-seo">
                <h1 class="head__title">{{ title }}</h1>
                <GlobalFilter class="head__filter" />
                <NuxtLink
                    v-if="locale === 'ru'"
                    :to="`/uz${route.fullPath}`"
                    style="position:absolute; left:-9999px; top:-9999px;"
                >Uzbek version</NuxtLink>

                <NuxtLink
                    v-else
                    :to="`/ru${route.fullPath.replace(/^\/uz/, '')}`"
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
    
    const props = defineProps<{
        title: string;
    }>()

</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/head.scss';
</style>