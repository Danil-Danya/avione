<template>
    <div class="tariffs__card">
        <div class="tariffs__card-top">
            <h3 class="tariffs__title title">{{ tariff.title }}</h3>
            <p class="tariffs__card-price">{{ formatNumber(tariff.price) }} сум</p>
        </div>
        <div class="tariffs__card-options">
            <ul class="tariffs__card-list">
                <li class="tariffs__card-li" v-for="item in tariffsList" :key="item">
                    <span class="tariffs__card-icon">
                        <Component :is="item.icon" />
                    </span>
                    <p class="tariffs__card-text">{{ item.text }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    //import { formatNumber } from '~/utils/formatNumber';

    const CardIcon = defineAsyncComponent(() => import('~/shared-ui/icons/tariffs/Card.vue'));
    const OkIcon = defineAsyncComponent(() => import('~/shared-ui/icons/tariffs/Ok.vue'));
    const NoIcon = defineAsyncComponent(() => import('~/shared-ui/icons/tariffs/No.vue'));


    const props = defineProps<{
        tariff: object
    }>();

    console.log(props.tariff);
    

    const tariffsList: Ref = ref([
        {
            icon:  props.tariff.baggage ? OkIcon : NoIcon,
            text: props.tariff.baggage ? `Багаж: ${props.tariff.baggage}` : 'Багаж отстуствует'
        },
        {
            icon:  props.tariff.handLuggage ? OkIcon : NoIcon,
            text: props.tariff.handLuggage ? `Ручная кладь: ${props.tariff.handLuggage}` : 'Ручная кладь отстуствует'
        },
        {
            text: props.tariff.services[0] ? `${props.tariff.services[0]?.name}: ${props.tariff?.services[0]?.statusName?.toLowerCase()}` : null
        },
        {
            text: props.tariff.services[1] ? `${props.tariff.services[1]?.name}: ${props.tariff?.services[1]?.statusName?.toLowerCase()}` : null
        },
        {
            text: props.tariff.services[2] ? `${props.tariff.services[2]?.name}: ${props.tariff?.services[2]?.statusName?.toLowerCase()}` : null
        },
        // {
        //     text: `${props.tariff.services[3]?.name}: ${props.tariff.services[3].statusName?.toLowerCase()}`
        // },
    ])

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/tariffs-card.scss';
</style>