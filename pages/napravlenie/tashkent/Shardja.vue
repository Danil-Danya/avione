<template>
    <Head :title="titleSharjah" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';

    import { seoTashkentSharjaRu, seoToshkentSharjaUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentSharjaUz.content : seoTashkentSharjaRu.content;
        return {
            content
        };
    });

    const titleSharjah = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Sharjah'
            : 'Прямые перелеты из Ташкента в Шарджу';
    });

    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Sharja AVIONE",
                description: "Toshkentdan Sharjaga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Sharja chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Sharja, Toshkent – Sharja chiptalari narxlari, arzon aviabiletlar Toshkent – Sharja AVIONE, Toshkent – Sharja to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Sharja samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Шарджа на AVIONE",
                description: "Прямые рейсы в Шарджу. Бронирование и покупка самых дешевых авиабилетов Ташкент – Шарджа. Сравнение цен на авиабилеты Ташкент - Шарджа на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Шарджа, цены на авиабилеты Ташкент – Шарджа, дешевые авиабилеты Ташкент – Шарджа AVIONE, прямые рейсы Ташкент – Шарджа, стоимость билетов на самолет из Ташкента в Шарджу, перелёты из Ташкент в Шарджу"
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
