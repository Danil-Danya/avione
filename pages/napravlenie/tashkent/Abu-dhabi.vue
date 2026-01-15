<template>
    <Head :title="title" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentAbuDhabiRu, seoToshkentDubaiUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const { locale } = useI18n();

    const title = computed(() => {
        return locale.value === 'uz'
            ? "Toshkentdan Abu-Dabi ga to'g'ridan-to'g'ri parvozlar"
            : 'Прямые перелеты из Ташкента в Абу-Даби';
    });


    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentDubaiUz.content : seoTashkentAbuDhabiRu.content;
        return {
            content
        };
    });


    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Abu-Dabi AVIONE",
                description: "Toshkentdan Abu-Dabiga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Abu-Dabi chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Abu-Dabi, Toshkent – Abu-Dabi chiptalari narxlari, arzon aviabiletlar Toshkent – Abu-Dabi, Toshkent – Abu-Dabi to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Abu-Dabiga samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Абу-Даби на AVIONE",
                description: "Прямые рейсы в Абу-Даби. Бронирование и покупка самых дешевых авиабилетов Ташкент – Абу-Даби. Сравнение цен на авиабилеты Ташкент – Абу-Даби на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Абу-Даби, цены на авиабилеты Ташкент – Абу-Даби, дешевые авиабилеты Ташкент – Абу-Даби, прямые рейсы Ташкент – Абу-Даби, стоимость билетов на самолет из Ташкента в Абу-Даби, перелёты из Ташкент в Абу-Даби"
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