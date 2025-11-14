<template>
    <section class="payment">
        <div class="container">
            <div class="payment__content">
                <div class="payment__top">
                    <div class="payment__top-left">
                        <h2 class="title payment__title">Выберите способ оплаты</h2>
                    </div>
                    <div class="payment__top-right">
                        <span class="payment__balance">
                            <BalanceIcon />
                            <p class="text">Баланс</p>
                        </span>
                        <span class="payment__balance">
                            <p class="text">10.000.000.000 сум</p>
                            <Button text="+" padding="5px 10px" background="#2E4AB5" />
                        </span>
                    </div>
                </div>
                <div class="payment__bottom">
                    <div class="payment__bottom-radio">
                        <Radio label="Оплатить с баланса" />
                        <Radio label="Оплатить корпоративной картой" />
                    </div>
                    <div class="payment__bottom-card">
                        <PaymentTab />
                        <PaymentForm />
                        <div class="payment__info">
                            <h3 class="title payment__info-price">Стоимость: 2.750.000 сум</h3>
                            <div class="payment__info-button">
                                <Button background="#EE2532" padding="10px 60px" text="Отменить" />
                                <Button background="#2E4AB5" padding="10px 60px" text="Купить" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { Ref, ref, defineAsyncComponent } from 'vue';

    import Button from '~/shared-ui/ui/Button.vue';
    import Radio from '~/shared-ui/ui/Radio.vue';

    import PaymentTab from '~/features/tabs/PaymentTab.vue';
    import PaymentForm from '~/features/forms/PaymentForm.vue';

    const BalanceIcon = defineAsyncComponent(() => import('~/shared-ui/icons/payment/Balance.vue'));

    const isBalanceRadioActive: Ref<boolean> = ref(false);
    const isCardRadioActive: Ref<boolean> = ref(false);

    

</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/payment.scss';
</style>