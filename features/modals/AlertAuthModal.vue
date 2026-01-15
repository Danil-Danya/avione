<template>
    <section class="alert__modal">
        <div class="alert__modal-overlay" @click="close" />

        <div class="alert__modal-content">
            <div v-if="isOk">
                <div class="registration__modal-head">
                    <img src="~/assets/images/logos/logo.svg" alt="Logo" class="registration__logo">
                </div>
                <RegistrationForm />
            </div>
            <div v-else>
                <div class="alert__modal-header">
                    <h2 class="alert__modal-title">{{ $t('alertTitle') }}</h2>
                </div>
    
    
                <p class="alert__modal-text">
                    {{ $t('alertAuthText') }}
                </p>
    
                <div class="alert__modal-actions">
                    <Button
                        padding="12px 36px"
                        :text="$t('alertOk')"
                        background="#2E4AB5"
                        @click="openAuthModal"
                    />
                    <Button
                        padding="12px 36px"
                        background="#EE2532"
                        @click="close"
                        :text="$t('alertClose')"
                        v-if="!isOk"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import Button from '@/shared-ui/ui/Button.vue';
    import RegistrationForm from '../forms/RegistrationForm.vue';

    const emit = defineEmits(['close']);
    const close = () => emit('close');
    
    const isOk: Ref<Boolean> = ref(false);

    const openAuthModal = () => {
        isOk.value = true;
    }

</script>

<style lang="scss">
    @import '@/assets/styles/features/modals/alert.scss';
</style>
