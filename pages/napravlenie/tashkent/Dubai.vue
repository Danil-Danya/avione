<template>
    <Head :title="titleDubai" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentDubaiRu, seoToshkentDubaiUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const { locale } = useI18n();

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentDubaiUz.content : seoTashkentDubaiRu.content;
        return {
            content
        };
    });

    const titleDubai = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Dubay'
            : 'Прямые перелеты из Ташкента в Дубай';
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Dubay AVIONE",
                description: "Toshkentdan Dubayga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Dubay chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Dubay, Toshkent – Dubay chiptalari narxlari, arzon aviabiletlar Toshkent – Dubay AVIONE, Toshkent – Dubay to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Dubay samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Дубай на AVIONE",
                description: "Прямые рейсы в Дубай. Бронирование и покупка самых дешевых авиабилетов Ташкент – Дубай. Сравнение цен на авиабилеты Ташкент – Дубай на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Дубай, цены на авиабилеты Ташкент – Дубай, дешевые авиабилеты Ташкент – Дубай AVIONE, прямые рейсы Ташкент – Дубай, стоимость билетов на самолет из Ташкента в Дубай, перелёты из Ташкента в Дубай"
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
