<template>
    <section class="contacts">
        <div class="container">
            <div class="contacts__content">
                <h2 class="title contacts__title">Контакты получателя</h2>
                <p class="text contacts__text">Отправим билеты, сообщим об изменениях в поездке. Свяжемся, если нужно будет уточнить информацию.</p>
                <ContactsForm />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import ContactsForm from '~/features/forms/ContactsForm.vue';
</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/contacts.scss';
</style>