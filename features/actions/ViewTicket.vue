<template>
    <div class="view">
        <div class="view__info">
            <div class="view__info-ul">
                <li class="view__info-li" v-for="item in infoList" :key="item">
                    <span class="view__icon">
                        <Component :is="item.icon" />
                    </span>
                    <p class="view__text">{{ item.text }}</p>
                </li>
            </div>
        </div>
        <p class="view__price">2.732.850 сум</p>
    </div>
</template>

<script setup lang="ts">

    const BriefcaseIcon = defineAsyncComponent(() => import('~/shared/icons/reservation/Briefcase.vue'));
    const BaggageIcon = defineAsyncComponent(() => import('~/shared/icons/reservation/Baggage.vue'));
    const BagIcon = defineAsyncComponent(() => import('~/shared/icons/reservation/Bag.vue'));

    const infoList: Ref = ref([
        {
            text: 'Эконом',
            icon: BagIcon
        },
        {
            text: '0 KG',
            icon: BaggageIcon
        },
        {
            text: '1 место ручной клади',
            icon: BriefcaseIcon
        },
    ])

</script>

<style lang="scss">
    @use '~/assets/styles/features/actions/view.scss';
</style>