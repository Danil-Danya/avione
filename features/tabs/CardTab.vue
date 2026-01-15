<template>
    <div class="card__tab-container">
        <div class="card__tab">
            <ul class="card__tab-list">
                <li class="card__tab-li" v-for="card in cardsTabList" :key="card">
                    <NuxtLink :to="card.link" class="card__tab-link active" :class="{'active': card.link === route.fullPath}">
                        {{ card.text }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <Button 
            text="<"
            background="#2E4AB5"
            padding="15px 30px"
            @click="goToBack"
            v-if="!isMobile"
        />

        <RouterLink to="/" class="search__button" v-if="!isMobile">
            Поиск
        </RouterLink>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, useRouter } from 'vue-router';
    import Button from '~/shared-ui/ui/Button.vue';

    import { useIsMobile } from '~/composables/useIsMobile';

    const isMobile = useIsMobile();

    const cardsTabList: Ref<object []> = ref([
        {
            text: 'Uzcard/Humo',
            link: '/profile/cards/?card_type=uz'
        },
        // {
        //     text: 'Visa/Mastercard',
        //     link: '/profile/cards/?card_type=international'
        // },
        // {
        //     text: 'Корпоративные',
        //     link: '/profile/cards/?card_type=corporative'
        // },
    ])

    const router = useRouter();
    const route = useRoute();

    if (!route.query.card_type) {
        router.replace({ 
            path: route.path, 
            query: { card_type: 'uz' } 
        });
    }

    const goToBack = () => {
        router.go(-1);
    }

</script>

<style lang="scss">
    @import '~/assets/styles/features/tab/card-tab.scss';
</style>