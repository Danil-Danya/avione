<template>
    <section class="navbar" :class="navbarClass">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__logo">
                    <NuxtLink to="/">
                        <img src="~/assets/images/logos/logo.svg" alt="Logo" class="navbar__logo-img">
                    </NuxtLink>
                </div>
                <div class="navbar__actions">
                    <ul class="navbar__actions-list">
                        <li class="navbar__actions-li" @click="toggleLanguage">
                            <span class="navbar__actions-icon">
                                <LangIcon />
                            </span>
                            <p class="navbar__actions-text">
                                {{ locale.toUpperCase() }}
                            </p>
                        </li>
                        <li class="navbar__actions-li" @click="toggleMenu"v-if="userStore.profile && route.path.includes('/profile') && isMobile">
                            <div :class="['navbar__actions-burger', { 'navbar__actions-burger--active': isOpen }]" @click="$emit('close')">
                                <div class="navbar__line"></div>
                                <div class="navbar__line"></div>
                                <div class="navbar__line"></div>
                            </div>
                        </li>
                        <li class="navbar__actions-li" @click="goToOrders" v-if="userStore.profile">
                            <span class="navbar__actions-icon">
                                <LoginIcon />
                            </span>
                            <p class="navbar__actions-text">
                                {{ userStore.profile.firstName }} 
                                {{ userStore.profile.lastName }}
                            </p>
                        </li>
                        <li class="navbar__actions-li" @click="toggleModal" v-else>
                            <span class="navbar__actions-icon">
                                <LoginIcon />
                            </span>
                            <p class="navbar__actions-text">{{ $t('authLoginButton') }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Transition name="modal">
            <RegistrationModal @closeModal="toggleModal" v-if="isActiveModal" />
        </Transition>
    </section>
</template>

<script setup lang="ts">

    import { defineAsyncComponent } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUserStore } from '~/entities/users/models/store';
    import { useIsMobile } from '~/composables/useIsMobile';

    import { useI18n } from 'vue-i18n';

    const { locale, setLocale } = useI18n();

    const toggleLanguage = async () => {
        const nextLocale = locale.value === 'ru' ? 'uz' : 'ru';
        await setLocale(nextLocale);
    };


    import RegistrationModal from '~/features/modals/RegistrationModal.vue';

    const LangIcon = defineAsyncComponent(() => import('~/shared-ui/icons/navbar/Lang.vue'));
    const LoginIcon = defineAsyncComponent(() => import('~/shared-ui/icons/navbar/Login.vue'));

    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const isMobile = useIsMobile();

    const isActiveModal: Ref<boolean> = ref(false);
    
    const toggleModal = () => {
        isActiveModal.value = !isActiveModal.value;
    }

    const goToOrders = () => {
        router.replace('/profile/orders')
    }

    const isOpen = ref(false);

    const emit = defineEmits<{
        (e: 'toggle-sidebar'): void
    }>();


    const toggleMenu = () => {
        isOpen.value = !isOpen.value;
        emit('toggle-sidebar'); 
    };


    const navbarClass = computed(() => {
        if (route.path === '/') {
            return '';
        }

        if (route.path.startsWith('/avia')) {
            return 'navbar__avia';
        }

        return 'navbar__other';
    });

    onMounted(async () => {
        await userStore.fetchProfile();

        setTimeout(async () => {
            await userStore.fetchProfile();
        }, 1000);
    })

    watch(() => route.path, () => {
        if (isOpen.value) {
            isOpen.value = false;
            emit('toggle-sidebar');
        }
    });

</script>

<style lang="scss">
    @import '~/assets/styles/shared/layouts/navbar.scss';
</style>