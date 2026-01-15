<template>
    <div class="buy">
        <h3 class="buy__price">
            {{ formatNumber(price) }} {{ $t('valute') }}
        </h3>

        <Button v-if="!route.query.ticket_id"
            class="buy__button"
            padding="15px 60px"
            background="#2E4AB5"
            :text="$t('buttonBuy')"
            @click="$emit('buy')"
        />
    </div>
</template>


<script setup lang="ts">

    import { useRoute } from 'vue-router';

    import Button from '~/shared-ui/ui/Button.vue';
    import Switcher from '~/shared-ui/ui/Switcher.vue';

    const props = defineProps<{
        id: string;
        price: number;
    }>();

    const route = useRoute();

</script>

<style lang="scss">
    @import '~/assets/styles/features/actions/buy.scss'
</style>