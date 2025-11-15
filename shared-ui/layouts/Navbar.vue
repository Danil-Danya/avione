<template>
    <section class="navbar">
        <div class="container">
            <div class="navbar__content">
                <div class="navbar__logo">
                    <img src="~/assets/images/logos/logo.svg" alt="Logo" class="navbar__logo-img" loading="lazy">
                </div>
                <div class="navbar__actions">
                    <ul class="navbar__actions-list">
                        <li class="navbar__actions-li">
                            <span class="navbar__actions-icon">
                                <LangIcon />
                            </span>
                            <p class="navbar__actions-text">RU</p>
                        </li>
                        <li class="navbar__actions-li" @click="toggleModal">
                            <span class="navbar__actions-icon">
                                <loginIcon />
                            </span>
                            <p class="navbar__actions-text">Войти</p>
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
    import RegistrationModal from '~/features/modals/RegistrationModal.vue';

    const LangIcon = defineAsyncComponent(() => import('~/shared-ui/icons/navbar/Lang.vue'));
    const LoginIcon = defineAsyncComponent(() => import('~/shared-ui/icons/navbar/Login.vue'));

    const isActiveModal: Ref<boolean> = ref(false);
    
    const toggleModal = () => {
        isActiveModal.value = !isActiveModal.value;
    }

</script>

<style lang="scss">
    @import '~/assets/styles/shared/layouts/navbar.scss';
</style>