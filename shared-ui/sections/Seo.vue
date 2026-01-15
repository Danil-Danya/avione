<template>
    <section class="seo">
        <div class="container">
            <div class="seo__content">
                <div :class="isNapravleniePage ? 'seo__info-napravlenie' : 'seo__info'">
                    <div class="seo__info-item" v-for="content in seo.content" :key="content">
                        <h3 class="seo__title" v-if="content.title">{{ content.title }}</h3>
                        <p class="seo__text" v-if="content.text">{{ content.text }}</p>
                        <ul class="seo__list-ul" v-if="content.ul?.length">
                            <li class="seo__li ul" v-for="li in content.ul" :key="li">{{ li }}</li>
                        </ul>
                        <ol class="seo__list-ol" v-if="content.ol?.length">
                            <li class="seo__li ol" v-for="li in content.ol" :key="li">{{ li }}</li>
                        </ol>
                    </div>
                </div>
                <div class="seo__image" v-if="seo.image">
                    <img :src="seo.image" alt="Превью" class="seo__img">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    
    import type { SeoContent } from '~/shared-ui/types/sections';

    import { useRoute } from 'vue-router';

    const route = useRoute();

    const isNapravleniePage = computed(() => {
        const pathWithoutLocale = route.path.replace(/^\/(ru|uz)/, '');
        return pathWithoutLocale.startsWith('/napravlenie/');
    });


    const { seo } = defineProps<{
        seo: SeoContent
    }>()

</script>

<style lang="scss">
    @import '~/assets/styles/shared/sections/seo.scss';
</style>