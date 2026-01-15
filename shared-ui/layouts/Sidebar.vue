<template>
    <div class="sidebar">
        <h2 class="title" v-if="!isMobile">{{ $t('profileTitle') }}</h2>
        <div class="sidebar__block">
            <ul class="sidebar__list">
                <li class="sidebar__li" v-for="link in sidebarList" :key="link">
                    <NuxtLink
                        :to="link.link"
                        class="sidebar__link"
                        v-if="link.link"
                        @click="onLinkClick"
                    >
                        <span class="sidebar__icon">
                            <Component :is="link.icon" />
                        </span>
                        <p class="sidebar__text">{{ link.text }}</p>
                    </NuxtLink>
                    <p class="sidebar__link exit" v-else @click="logout">
                        <span class="sidebar__icon">
                            <Component :is="link.icon" />
                        </span>
                        <p class="sidebar__text">{{ link.text }}</p>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { Ref, ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useIsMobile } from '~/composables/useIsMobile';

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const OrderIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sidebar/Order.vue'));
    const CardsIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sidebar/Cards.vue'));
    const CheckIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sidebar/Check.vue'));
    const ExitIcon = defineAsyncComponent(() => import('~/shared-ui/icons/sidebar/Exit.vue'));

    const isMobile = useIsMobile();

    const router = useRouter();

    // const route = useRoute();

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    const onLinkClick = () => {
        if (isMobile.value) {
            emit('close');
        }
};



    const sidebarList: Ref<object []> = ref([
        {
            text: t('sidebarOrders'),
            link: '/profile/orders',
            icon: OrderIcon
        },
        {
            text: t('sidebarPassengers'),
            link: '/profile/passengers',
            icon: CheckIcon
        },
        {
            text: t('sidebarCards'),
            link: '/profile/cards',
            icon: CardsIcon
        },
        {
            text: t('sidebarLogout'),
            icon: ExitIcon
        },
    ])

    const logout = () => {
        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            if (!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'))) {
                router.replace({ path: '/' });
            }
        }
    }

</script>

<style lang="scss">
    @import '~/assets/styles/shared/layouts/sidebar.scss';
</style>