<template>
    <div class="card__tab">
        <ul class="card__tab-list">
            <li class="card__tab-li" v-for="card in cardsTabList" :key="card">
                <NuxtLink :to="card.link" class="card__tab-link" :class="{'active': card.link === route.fullPath}">
                    {{ card.text }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

    import { useRoute, useRouter } from 'vue-router';

    const cardsTabList: Ref<object []> = ref([
        {
            text: 'Uzcard/Humo',
            link: '/profile/cards/?card_type=uz'
        },
        {
            text: 'Visa/Mastercard',
            link: '/profile/cards/?card_type=international'
        },
        {
            text: 'Корпоративные',
            link: '/profile/cards/?card_type=corporative'
        },
    ])

    const router = useRouter()
    const route = useRoute();

    if (!route.query.card_type) {
        router.replace({ 
            path: route.path, 
            query: { card_type: 'uz' } 
        });
    }

</script>

<style lang="scss">
    @import '~/assets/styles/features/tab/card-tab.scss';
</style>