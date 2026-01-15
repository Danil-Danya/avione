<template>
    <Head :title="titleDushanbe" />
    <Seo :seo="seoText" />
</template>

<script setup>

    import Head from '~/shared-ui/sections/Head.vue';
    import Seo from '~/shared-ui/sections/Seo.vue';
    
    import { seoTashkentDushanbeRu, seoToshkentDushanbeUz } from '~/helpers/seo';

    import { useI18n } from 'vue-i18n';

    const { locale } = useI18n();

    import { useRoute } from 'vue-router';
    const currentPath = useRoute().path;

    const seoText = computed(() => {
        const content = locale.value === 'uz' ? seoToshkentDushanbeUz.content : seoTashkentDushanbeRu.content;
        return {
            content
        };
    });

    const titleDushanbe = computed(() => {
        return locale.value === 'uz'
            ? 'Eng arzon aviachiptalar Toshkent – Dushanbe'
            : 'Прямые перелеты из Ташкента в Душанбе';
    });


    watchEffect(() => {
        if (locale.value === 'uz') {
            useSeoMeta({
                title: "Arzon aviabiletlar Toshkent – Dushanbe AVIONE",
                description: "Toshkentdan Dushanbega to‘g‘ridan-to‘g‘ri parvozlar. Eng arzon aviabiletlarga bron qilish va xarid qilish. AVIONE orqali Toshkent – Dushanbe chiptalarining narxlarini solishtiring",
                keywords: "eng arzon aviabiletlar Toshkent – Dushanbe, Toshkent – Dushanbe chiptalari narxlari, arzon aviabiletlar Toshkent – Dushanbe AVIONE, Toshkent – Dushanbe to‘g‘ridan-to‘g‘ri parvozlar, Toshkentdan Dushanbe samolyot chiptasi narxi"
            });
        } else {
            useSeoMeta({
                title: "Дешевые авиабилеты Ташкент – Душанбе на AVIONE",
                description: "Прямые рейсы в Душанбе. Бронирование и покупка самых дешевых авиабилетов Ташкент – Душанбе. Сравнение цен на авиабилеты Ташкент – Душанбе на AVIONE",
                keywords: "самые дешевые авиабилеты Ташкент – Душанбе, цены на авиабилеты Ташкент – Душанбе, дешевые авиабилеты Ташкент – Душанбе AVIONE, прямые рейсы Ташкент – Душанбе, стоимость билетов на самолет из Ташкента в Душанбе, перелёты из Ташкента в Душанбе"
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
