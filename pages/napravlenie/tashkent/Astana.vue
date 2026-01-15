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
            ? "Toshkentdan Astana (Nur-Sulton) ga to'g'ridan-to'g'ri parvozlar"
            : 'Прямые перелеты из Ташкента в Астану (Нур-Султан)';
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
                title: "Arzon aviabiletlar Toshkent – Astana (Nur-Sulton) AVIONE",
                description: "Toshkentdan Astana (Nur-Sulton) ga to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Astana (Nur-Sulton) chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Astana (Nur-Sulton), Toshkent – Astana chiptalari narxlari, arzon aviabiletlar Toshkent – Astana (Nur-Sulton), Toshkent – Astana (Nur-Sulton) to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Astana (Nur-Sulton) samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Астана (Нур-Султан) на AVIONE",
                description: "Прямые рейсы в Астану (Нур-Султан). Бронирование и покупка самых дешевых авиабилетов Ташкент – Астана (Нур-Султан). Сравнение цен на авиабилеты Ташкент – Астана (Нур-Султан) на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Астана (Нур-Султан), цены на авиабилеты Ташкент – Астана, дешевые авиабилеты Ташкент – Астана (Нур-Султан), прямые рейсы Ташкент – Астана (Нур-Султан), стоимость билетов на самолет из Ташкента в Астану (Нур-Султан), перелёты из Ташкент в Астану (Нур-Султан)"
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
