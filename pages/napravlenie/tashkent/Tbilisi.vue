<template>
    <Head :title="titleTbilisi" />
    <Seo :seo="seoText" />
</template>

<script setup>

import Head from '~/shared-ui/sections/Head.vue';
import Seo from '~/shared-ui/sections/Seo.vue';

import { seoTashkentTbilisiRu, seoToshkentTbilisiUz } from '~/helpers/seo';

import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

import { useRoute } from 'vue-router';
const currentPath = useRoute().path;

const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentTbilisiUz.content : seoTashkentTbilisiRu.content;
        return {
            content
        };
    });

const titleTbilisi = computed(() => {
    return locale.value === 'uz'
        ? 'Eng arzon aviachiptalar Toshkent – Tbilisi'
        : 'Прямые перелеты из Ташкента в Тбилиси';
});

watchEffect(() => {
    if (locale.value === 'uz') {
        useSeoMeta({
            title: "Arzon aviabiletlar Toshkent – Tbilisi AVIONE",
            description: "Toshkentdan Tbilisiga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Tbilisi chiptalarining narxlarini solishtiring",
            keywords: "eng arzon aviabiletlar Toshkent – Tbilisi, Toshkent – Tbilisi chiptalari narxlari, arzon aviabiletlar Toshkent – Tbilisi AVIONE, Toshkent – Tbilisi to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Tbilisi samolyot chiptasi narxi"
        });
    } else {
        useSeoMeta({
            title: "Дешевые авиабилеты Ташкент – Тбилиси на AVIONE",
            description: "Прямые рейсы в Тбилиси. Бронирование и покупка самых дешевых авиабилетов Ташкент – Тбилиси. Сравнение цен на авиабилеты Ташкент - Тбилиси на AVIONE",
            keywords: "самые дешевые авиабилеты Ташкент – Тбилиси, цены на авиабилеты Ташкент – Тбилиси, дешевые авиабилеты Ташкент – Тбилиси AVIONE, прямые рейсы Ташкент – Тбилиси, стоимость билетов на самолет из Ташкента в Тбилиси, перелёты из Ташкент в Тбилиси"
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
