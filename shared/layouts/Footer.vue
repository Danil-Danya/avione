<template>
    <section class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__preview">
                    <div class="footer__logo">
                        <img src="~/assets/images/logos/logo.svg" alt="Logo" class="footer__logo-img">
                    </div>
                    <div class="footer__socials">
                        <h3 class="footer__title">Мы в соцсетях</h3>
                        <ul class="footer__socials-list">
                            <li class="footer__socials-li" v-for="socialLink in socialLinks" :key="socialLink">
                                <a :href="socialLink.link" class="footer__socials-link">
                                    <img :src="socialLink.path" alt="icon" class="footer__socials-icon">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer__site-links">
                    <h3 class="footer__title">Компания</h3>
                    <ul class="footer__site-list">
                        <li class="footer__site-li">

                        </li>
                    </ul>
                </div>
                <div class="footer__cities-links">
                    <h3 class="footer__title">Направления</h3>
                </div>
                <div class="footer__app">
                    <h3 class="footer__title">Скачайте приложение</h3>
                </div>
            </div>
            <div class="footer__container">
                <div class="footer__info">

                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { ref, Ref } from 'vue';
    import type { SocialLinks, TextLink } from '~/shared/types/footer';

    const socialLinks: Ref<SocialLinks> = ref({
        instagram: { 
            path: new URL('~/assets/images/socials/instagram.png', import.meta.url).href, 
            link: 'https://www.instagram.com/avione.uz/' 
        },

        telegram: { 
            path: new URL('~/assets/images/socials/telegram.png', import.meta.url).href,  
            link: 'https://telegram.im/@avion_uzbekistan?lang=ru' 
        },

        facebook: { 
            path: new URL('~/assets/images/socials/facebook.png', import.meta.url).href,  
            link: 'https://www.facebook.com/avioneuzbekistan/' 
        },

        youtube: { 
            path: new URL('~/assets/images/socials/youtube.png', import.meta.url).href, 
            link: 'https://www.youtube.com/@avioneuz' 
        }
    })

    const companyLinks: Ref<TextLink []> = ref([
        {
            path: '/',
            text: 'О компания'
        },

        {
            path: '/',
            text: 'Авиабилеты'
        },

        {
            path: '/',
            text: 'Оферта'
        },

        {
            path: '/',
            text: 'Confidentiality'
        },
    ])

    const citiesLinks: Ref<TextLink []> = ref([
        {
            path: '/',
            text: 'Ташкент - Москва'
        },
        {
            path: '/',
            text: 'Мовска - Ташкент'
        },
        {
            path: '/',
            text: 'Ташкент - Казань'
        },
        {
            path: '/',
            text: 'Ташкент - Стамбул'
        },
        {
            path: '/',
            text: 'Шымкент - Стамбул'
        },
    ])

</script>