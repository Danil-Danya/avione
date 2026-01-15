<template>
    <Head :title="title" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoMoscowRu, seoTashkentMoscowUz } from '~/helpers/seo';
    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const title = computed(() => locale.value === 'uz' ? "Toshkentdan Moskvaga to'g'ridan - togri parvozlar" : 'Прямые перелеты из Ташкента в Москву');

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoTashkentMoscowUz.content : seoMoscowRu.content;
        return {
            content
        };
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Moskva AVIONE",
                description: "Toshkentdan Moskvaga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Moskva chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Moskva, Toshkent – Moskva chiptalari narxlari, arzon aviabiletlar Toshkent – Moskva AVIONE, Toshkent – Moskva to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Moskva samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Москва на AVIONE",
                description: "Прямые рейсы в Москву. Бронирование и покупка самых дешевых авиабилетов Ташкент – Москва. Сравнение цен на авиабилеты Ташкент – Москва на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Москва, цены на авиабилеты Ташкент – Москва, дешевые авиабилеты Ташкент – Москва AVIONE, прямые рейсы Ташкент – Москва, стоимость билетов на самолет из Ташкента в Москву, перелёты из Ташкента в Москву"
            });
        }
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

    definePageMeta({
        layout: 'site-layout',
    })

</script>
