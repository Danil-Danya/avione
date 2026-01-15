<template>
    <Head :title="titleShymkent" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentShymkentRu, seoToshkentShymkentUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentShymkentUz.content : seoTashkentShymkentRu.content;
        return {
            content
        };
    });

    const titleShymkent = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Shymkent'
            : 'Прямые перелеты из Ташкента в Шымкент';
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Shymkent AVIONE",
                description: "Toshkentdan Shymkentga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Shymkent chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Shymkent, Toshkent – Shymkent chiptalari narxlari, arzon aviabiletlar Toshkent – Shymkent AVIONE, Toshkent – Shymkent to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Shymkent samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Шымкент на AVIONE",
                description: "Прямые рейсы в Шымкент. Бронирование и покупка самых дешевых авиабилетов Ташкент – Шымкент. Сравнение цен на авиабилеты Ташкент - Шымкент на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Шымкент, цены на авиабилеты Ташкент – Шымкент, дешевые авиабилеты Ташкент – Шымкент AVIONE, прямые рейсы Ташкент – Шымкент, стоимость билетов на самолет из Ташкента в Шымкент, перелёты из Ташкент в Шымкент"
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
