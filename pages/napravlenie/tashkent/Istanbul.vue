<template>
    <Head :title="titleIstanbul" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentIstanbulRu, seoToshkentIstanbulUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;


    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentIstanbulUz.content : seoTashkentIstanbulRu.content;
        return {
            content
        };
    });

    const titleIstanbul = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Istanbul'
            : 'Прямые перелеты из Ташкента в Стамбул';
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Istanbul AVIONE",
                description: "Toshkentdan Istanbulga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Istanbul chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Istanbul, Toshkent – Istanbul chiptalari narxlari, arzon aviabiletlar Toshkent – Istanbul AVIONE, Toshkent – Istanbul to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Istanbul samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Стамбул на AVIONE",
                description: "Прямые рейсы в Стамбул. Бронирование и покупка самых дешевых авиабилетов Ташкент – Стамбул. Сравнение цен на авиабилеты Ташкент – Стамбул на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Стамбул, цены на авиабилеты Ташкент – Стамбул, дешевые авиабилеты Ташкент – Стамбул AVIONE, прямые рейсы Ташкент – Стамбул, стоимость билетов на самолет из Ташкента в Стамбул, перелёты из Ташкента в Стамбул"
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
