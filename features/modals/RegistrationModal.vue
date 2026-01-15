<template>
    <div class="registration__modal modal">
        <div class="modal__wrapper registration__modal-wrapper">
            <span class="modal__close">
                <CloseIcon @click="onCloseModal" />
            </span>
            <div class="registration__modal-head">
                <img src="~/assets/images/logos/logo.svg" alt="Logo" class="registration__logo">
            </div>
            <div class="registration__modal-content">
                <RegistrationForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import RegistrationForm from '../forms/RegistrationForm.vue';
    
    const CloseIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/Close.vue')); 

    const emits = defineEmits(['closeModal']);

    const onCloseModal = () => {
        emits('closeModal');
    };

</script>


<style lang="scss">
    @import '~/assets/styles/features/modals/registration.scss';
</style>