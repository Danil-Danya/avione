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
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import Button from '~/shared/ui/Button.vue';
    const BalanceIcon = defineAsyncComponent(() => import('~/shared/icons/payment/Balance.vue'));

</script>

<style lang="scss">
    @use '~/assets/styles/shared/pages/payment.scss';
</style>