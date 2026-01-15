import viteTsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

process.env.SASS_SILENCE_DEPRECATION_WARNINGS = '1';
process.env.SASS_QUIET_DEPS = 'true';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    
    ssr: true,

    server: {
        port: process.env.NITRO_PORT || 8000,
        host: process.env.NITRO_HOST || '127.0.0.1'
    },

    yandexMetrika: {
        id: 106138666,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        defer: false,     
        useCDN: true,      
        dev: true  
    },

    app: {
        head: {
            title: 'Купить авиабилеты онлайн по Узбекистану и за границу на AVIONE',
            htmlAttrs: {
                lang: 'ru'
            },

            script: [
                {
                    async: true,
                    src: 'https://www.googletagmanager.com/gtag/js?id=G-XM5NN2H481',
                },
                {
                    children: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XM5NN2H481');
                    `,
                },
                {
                    type: 'text/javascript',
                    children: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1599624121034257');
                        fbq('track', 'PageView');
                    `,
                },
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content: 'Avione — онлайн продажа авиабилетов в Ташкенте. Покупай дешёвые авиабилеты быстро и удобно.'
                },
                {
                    name: 'keywords',
                    content: 'авиабилеты, купить билет, дешёвые авиабилеты, Ташкент, Avione, онлайн бронирование'
                },
                { property: 'og:image', content: 'https://avione.uz/logo.png' },
            ],
        },
        pageTransition: false
    },

    experimental: {
        clientRouteNavigation: false,
        payloadExtraction: false
    },

    runtimeConfig: {
        public: {
            siteBaseURL: process.env.SITE_BASE_URL,
            apiBaseURL: process.env.API_BASE_URL
        }
    },
    

    devtools: { enabled: true },
    modules: [
        'yandex-metrika-module-nuxt3',
        '@nuxtjs/i18n', 
        '@nuxt/image', 
        '@nuxt/fonts', 
        '@nuxt/icon', 
    ],
 
    css: [
        '@/assets/styles/main.scss',
        //'~/assets/styles/global/wrapper.scss'
        // 'vue-select/dist/vue-select.css'
    ],

    srcDir: '.',

    plugins: [
        './plugins/pinia.ts',
        './plugins/vue-date-picker.client.ts',
        './plugins/api.instance.ts',
        {
            ssr: false,
            src: './plugins/vue-range-slider.client.ts'
        }
    ],

    i18n: {
        locales: [
            { code: 'ru', name: 'Русский', file: 'rus.json' },
            { code: 'uz', name: 'O‘zbekcha', file: 'uzb.json' }
        ],

        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_lang',
            alwaysRedirect: false,
            fallbackLocale: 'ru'
        },

        defaultLocale: 'ru',
        langDir: 'locales',
        strategy: 'prefix',
    },

    
    vite: {
        //plugins: [viteTsconfigPaths()],
        logLevel: 'error',
        build: {
            target: 'esnext',
            cssCodeSplit: false,
            sourcemap: false,
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.info', 'console.debug', 'console.warn'],
                },
                format: {
                    comments: false,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor-core': ['vue', 'vue-router', 'pinia'],
                        //'vendor-sentry': ['@sentry/vue', '@sentry/browser'],
                        'vendor-swiper': ['swiper'],
                        'vendor-gsap': ['gsap'],
                    },
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/styles/global/wrapper.scss";`,
                },
            },
        },

        optimizeDeps: {
            include: ['axios', 'pinia'],
        },
    },

    alias: {
        '~': resolve('./'),
        '@': resolve('./'),
    },
})