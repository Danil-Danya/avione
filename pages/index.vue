<template>
    <Head />
    <Advertising />
    <Catalog />
    <Seo :seo="seoText" />
</template>

<script setup lang="ts">

    import { useI18n } from 'vue-i18n';
    import { seoTextRu, seoTextUz } from '~/helpers/seo';

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;


    import Head from '~/shared-ui/pages/index/Head.vue';
    import Advertising from '~/shared-ui/pages/index/Advertising.vue';
    import Catalog from '~/shared-ui/sections/Catalog.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import air from '~/assets/images/seo/air.png';

    definePageMeta({
        layout: 'site-layout'
    })

    const { locale } = useI18n();

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoTextUz.content : seoTextRu.content;
        return {
            image: air,
            content
        };
    });

    useSeoMeta({
        title: 'Купить авиабилеты онлайн по Узбекистану и за границу на AVIONE',
        description: 'Дешевые авиабилеты по Узбекистану и за рубеж. Онлайн бронирование, быстрый поиск и сравнение цен на AVIONE. Покупка билетов на самолет без скрытых комиссий.',
        keywords: 'купить авиабилет онлайн, авиабилеты Узбекистан, дешевые авиабилеты, бронирование авиабилетов, билеты на самолет, авиабилеты без комиссии, акции авиабилеты, авиабилеты со скидкой, авиабилеты в Ташкент, авиабилеты за границу'
    });

    useHead({
        link: [
            {
                rel: 'alternate',
                hreflang: 'ru',
                href: `https://avione.uz/ru${currentPath.replace(/^\/(uz|ru)/, '')}`
            },
            {
                rel: 'alternate',
                hreflang: 'uz',
                href: `https://avione.uz/uz${currentPath.replace(/^\/(uz|ru)/, '')}`
            }
        ]
    });
    
</script>