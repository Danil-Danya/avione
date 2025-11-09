<template>
    <div class="passangers">
        <div class="container">
            <div class="passangers__content">
                <h2 class="passangers__title title">Данные пассажиров</h2>
                <p class="passangers__text text">Введите личные данные, как указано в документе, по которому вы полетите. Мы автоматически переведем текст на латиницу — не пугайтесь, все нормально</p>
                <div class="passangers__alert-container">
                    <h3 class="passangers__alert">Пассажир №1</h3>
                    <span class="passangers__alert-span">12 лет и старше</span>
                </div>
                <PassangersForm />
                <div class="passangers__info" v-if="path === '/reservation'">
                    <div class="passangers__price-container">
                        <p class="passangers__price">Стоимость:</p>
                        <p class="passangers__price">2.732.850 сум</p>   
                    </div>
                    <div class="passangers__button-container">
                        <Button background="#2E4AB5" text="Бронировать" padding="10px 30px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import PassangersForm from '~/features/forms/PassangersForm.vue';
    import Button from '~/shared/ui/Button.vue';

    const route = useRoute();
    const path = route.path;


</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/passangers.scss';
</style>