<template>
    <form class="contacts__form">
        <div class="contacts__form-input-container">
            <h3 class="input__title">{{ $t('contactsPhone') }}</h3>
            <Input type="text" :placeholder="$t('contactsPhonePlaceholder')" width="300px" v-model="phone" />
        </div>
        <div class="contacts__form-input-container">
            <h3 class="input__title">{{ $t('contactsEmail') }}</h3>
            <Input type="text" :placeholder="$t('contactsEmailPlaceholder') " width="300px" />
        </div>
    </form>
</template>

<script setup lang="ts">

    import Input from '~/shared-ui/ui/Input.vue';
    import { useUserStore } from '~/entities/users/models/store';

    const userStore = useUserStore();
    
    await userStore.fetchProfile();

    const phone = ref('');
    phone.value = '+998' + userStore.profile.phone;

</script>