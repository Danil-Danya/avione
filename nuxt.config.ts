import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    
    ssr: true,

    server: {
        port: process.env.NITRO_PORT || 8000,
        host: process.env.NITRO_HOST || '127.0.0.1'
    },

    app: {
        head: {
            title: 'Avione — дешёвые авиабилеты онлайн',
            htmlAttrs: {
                lang: 'ru'
            },
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
                }
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
    modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],
 
    css: [
        '~/assets/styles/main.scss'
    ],

    srcDir: '.',
    
    vite: {
        plugins: [viteTsconfigPaths()],
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
                scss: {},
            },
        },
        optimizeDeps: {
            include: ['axios', 'pinia'],
        },
    },

    alias: {
        "@app": "/app",
        "@entities": "/entities",
        "@features": "/features",
        "@shared": "/shared",
        "@widgets": "/widgets",
        "@api": "/api",
    },
})