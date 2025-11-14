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
                    <ul class="footer__list">
                        <li class="footer__li" v-for="link in companyLinks" :key="link">
                            <a :href="link.path" class="footer__link">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer__cities-links">
                    <h3 class="footer__title">Направления</h3>
                    <ul class="footer__list">
                        <li class="footer__li" v-for="link in citiesLinks" :key="link">
                            <a :href="link.path" class="footer__link">
                                {{ link.text }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer__app">
                    <h3 class="footer__title">Скачайте приложение</h3>
                    <div class="footer__app-container">
                        <img src="~/assets/images/footer/qr.png" alt="qr" class="footer__app-qr">
                        <div class="footer__app-logos">
                            <a :href="link.link" class="footer__app-link" v-for="link in appLinks" :key="link">
                                <img :src="link.path" alt="Магазин">
                                <p class="footer__app-text">{{ link.text }}</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__container">
                <div class="footer__info">
                    <span class="footer__line"></span>
                    <p class="footer__text">© 2025 Онлайн-продажа авиабилетов в Ташкенте. Частное предприятие «Avione», зарегистрированное в качестве юридического лица по законодательству Республики Узбекистан, г. Ташкент, Чиланзар, Катартал-8. Дата регистрации — 05.03.2020 г., свидетельство о регистрации № 824437.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { ref, Ref } from 'vue';
    import type { AppLinks, SocialLinks, TextLink } from '~/shared-ui/types/footer';

    import instagram from '~/assets/images/socials/instagram.png';
    import telegram from '~/assets/images/socials/telegram.png';
    import facebook from '~/assets/images/socials/facebook.png';
    import youtube from '~/assets/images/socials/youtube.png';

    import googlePlay from '~/assets/images/footer/googleplay.png';
    import appStore from '~/assets/images/footer/appstore.png';

    const socialLinks: Ref<SocialLinks> = ref({
        instagram: { 
            path: instagram, 
            link: 'https://www.instagram.com/avione.uz/' 
        },

        telegram: { 
            path: telegram,  
            link: 'https://telegram.im/@avion_uzbekistan?lang=ru' 
        },

        facebook: { 
            path: facebook,  
            link: 'https://www.facebook.com/avioneuzbekistan/' 
        },

        youtube: { 
            path: youtube, 
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

    const appLinks: Ref<AppLinks> = ref({
        appStore: {
            path: appStore,
            text: 'App Store',
            link: ''
        },

        googlePlay: {
            path: googlePlay,
            text: 'Google play',
            link: ''
        }
    })

</script>

<style lang="scss">
    @import '~/assets/styles/shared/layouts/footer.scss';
</style>