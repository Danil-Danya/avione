<template>
     <NuxtLayout :class="preloaderRef ? 'hidden' : null">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>

    import { useRouter } from 'vue-router'

    const router = useRouter();

    if (process.client && !window.ym) {
        const script = document.createElement('script')
        script.src = 'https://mc.yandex.ru/metrika/tag.js'
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments) }
            window.ym(106138666, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            })

            window.ym(106138666, 'hit', location.pathname + location.search)

            router.afterEach((to) => {
                window.ym(106138666, 'hit', to.fullPath)
            })
        }
    }

</script>

<!-- <style lang="scss">
    @import '~/assets/styles/global/wrapper.scss';
</style> -->