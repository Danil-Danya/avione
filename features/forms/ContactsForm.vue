<template>
    <form class="contacts__form">
        <div class="contacts__form-input-container">
            <h3 class="input__title">Номер телефона</h3>
            <Input type="text" placeholder="Введите номер телефона" width="300px" />
        </div>
        <div class="contacts__form-input-container">
            <h3 class="input__title">Электронная почта</h3>
            <Input type="text" placeholder="Не обязательно" width="300px" />
        </div>
    </form>
</template>

<script setup lang="ts">

    import Input from '~/shared-ui/ui/Input.vue';

</script>