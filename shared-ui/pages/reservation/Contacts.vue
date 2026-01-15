<template>
    <section class="contacts">
        <div class="container">
            <div class="contacts__content">
                <h2 class="title contacts__title">{{ $t('contactsTitle') }}</h2>
                <p class="text contacts__text">{{ $t('contactsDescription') }}</p>
                <ContactsForm />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import ContactsForm from '~/features/forms/ContactsForm.vue';
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/contacts.scss';
</style>