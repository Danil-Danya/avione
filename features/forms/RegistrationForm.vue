<template>
    <form class="registration__form">
        <h2 class="title registration__form-title">Вход в личный кабинет</h2>
        <div class="registration__form-input-container">
            <label class="registration__form-label">Телефонный номер</label>
            <input 
                ref="inputRef"
                type="tel"
                class="registration__form-input"
                placeholder="+998 (90) 990-90-90"
            >
        </div>
        <div class="registration__form-checkbox-container">
            <Checkbox />
            <NuxtLink to="/privacy" class="registration__form-text">Я ознакомился и согласен с условиями Публичной оферты и Политикой конфиденциальности</NuxtLink>
        </div>
        <div class="registration__form-button-container">
            <Button text="Войти" background="#2E4AB5" padding="15px 30px" class="registration__form-button" />
        </div>
    </form>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import Checkbox from '~/shared-ui/ui/Checkbox.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const inputRef = ref<HTMLInputElement | null>(null);

    onMounted(async () => {
        const IMask = (await import('imask')).default;

        if (inputRef.value) {
            IMask(inputRef.value, {
                mask: '+{998} (00) 000-00-00'
            });
        }
    });
</script>

<style lang="scss">
    @import '~/assets/styles/features/forms/registration.scss';
</style>
