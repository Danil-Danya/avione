<template>
    <div class="buy">
        <h3 class="buy__price">2.732.850 сум</h3>
        <div class="buy__baggage">
            <div class="buy__baggage-info">
                <p class="buy__baggage-text">Багаж 23 кг</p>
                <p class="buy__baggage-price">229 000 сум</p>
            </div>
            <Switcher />
        </div>
        <Button padding="15px 60px" background="#2E4AB5" text="Купить" />
    </div>
</template>

<script setup lang="ts">

    import Button from '~/shared-ui/ui/Button.vue';
    import Switcher from '~/shared-ui/ui/Switcher.vue';

</script>

<style lang="scss">
    @import '~/assets/styles/features/actions/buy.scss'
</style>