<template>
    <form class="payment__form">
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">Номер карты</h3>
            <Input type="card" v-model="cardPayload.card" class="payment__form-input" placeholder="0000 0000 0000 0000" />
        </div>
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">Срок действия</h3>
            <Input type="MMYY" v-model="cardPayload.MMYY" class="payment__form-input" placeholder="ММ/ГГ" />
        </div>
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">Сохранить карту</h3>
            <Input type="tel" v-model="cardPayload.tel" class="payment__form-input" placeholder="+998 (90) 999-99-99" />
        </div>
    </form>
</template>

<script lang="ts" setup>

    import { Reactive } from 'vue';
    import Input from '~/shared-ui/ui/Input.vue';

    const cardPayload: Reactive<Object> = reactive({
        card: '',
        tel: '',
        MMYY: ''
    })

</script>