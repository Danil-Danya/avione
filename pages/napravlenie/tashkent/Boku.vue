<template>
    <Head :title="title" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentAstanaRu, seoToshkentAstanaUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const title = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Boku'
            : 'Прямые перелеты из Ташкента в Баку';
    });


    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentAstanaUz.content : seoTashkentAstanaRu.content;
        return {
            content
        };
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Boku AVIONE",
                description: "Toshkentdan Boku ga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Boku chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Boku, Toshkent – Boku chiptalari narxlari, arzon aviabiletlar Toshkent – Boku, Toshkent – Boku to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Boku samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Баку на AVIONE",
                description: "Прямые рейсы в Баку. Бронирование и покупка самых дешевых авиабилетов Ташкент – Баку. Сравнение цен на авиабилеты Ташкент – Баку на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Баку, цены на авиабилеты Ташкент – Баку, дешевые авиабилеты Ташкент – Баку, прямые рейсы Ташкент – Баку, стоимость билетов на самолет из Ташкента в Баку, перелёты из Ташкента в Баку"
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
