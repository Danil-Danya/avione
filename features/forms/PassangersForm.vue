<template>
    <form class="passangers__form">
        <div class="passangers__form-top">
            <div class="passangers__form-input-container">
                <h3 class="input__title">Сохранненые </h3>
                <Input type="text" placeholder="Выбрать пассажира" width="250px" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Фамилия</h3>
                <Input type="text" placeholder="Введите фамилию пассажира" width="250px" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Имя</h3>
                <Input type="text" placeholder="Введите имя пассажира" width="250px" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Дата рождения</h3>
                <Input type="text" placeholder="дд.мм.гггг" width="250px" />
            </div>
        </div>
        <div class="passangers__form-bottom" v-if="path === '/reservation'">
            <div class="passangers__form-switcher-container">
                <h3 class="input__title">Пол </h3>
                <div class="passangers__switcher">
                    <Button text="МУЖ" background="#2E4AB5" padding="5px 15px" />
                    <Button text="ЖЕН" background="#EFF1F4" padding="5px 15px" class="black" />
                </div>
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Гражданство</h3>
                <Input type="text" placeholder="Узбекистан" width="250px" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Номер документа</h3>
                <Input type="text" placeholder="Введите номер документа" width="250px" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">Срок документа</h3>
                <Input type="text" placeholder="дд.мм.гггг" width="250px" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">

    import { useRoute } from 'vue-router';

    import Input from '~/shared-ui/ui/Input.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const route = useRoute();
    const path = route.path;

    console.log(path);
    

</script>