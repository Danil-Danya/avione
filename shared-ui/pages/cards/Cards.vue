<template>
    <div class="card">
        <div class="card__content">
            <CardTable />
            <div class="card__form-block card__form-block">
                <h3 class="card__form-title">Банковская карта</h3>
                <PaymentForm />
                <Button background="#2E4AB5" padding="5px" text="Сохранить карту" class="card__form-button" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import PaymentForm from '~/features/forms/PaymentForm.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const CardTable = defineAsyncComponent(() => import('~/features/tables/CardTable.vue'));
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/card.scss';
</style>