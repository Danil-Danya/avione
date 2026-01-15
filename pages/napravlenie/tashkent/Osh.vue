<template>
    <Head :title="titleOsh" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    
    import { seoTashkentOshRu, seoToshkentOshUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentOshUz.content : seoTashkentOshRu.content;
        return {
            content
        };
    });

    const titleOsh = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Osh'
            : 'Прямые перелеты из Ташкента в Ош';
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Osh AVIONE",
                description: "Toshkentdan Oshga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Osh chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Osh, Toshkent – Osh chiptalari narxlari, arzon aviabiletlar Toshkent – Osh AVIONE, Toshkent – Osh to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Osh samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Ош на AVIONE",
                description: "Прямые рейсы в Ош. Бронирование и покупка самых дешевых авиабилетов Ташкент – Ош. Сравнение цен на авиабилеты Ташкент - Ош на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Ош, цены на авиабилеты Ташкент – Ош, дешевые авиабилеты Ташкент – Ош AVIONE, прямые рейсы Ташкент – Ош, стоимость билетов на самолет из Ташкента в Ош, перелёты из Ташкент в Ош"
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
