<template>
    <div class="tariffs__card">
        <div class="tariffs__card-top">
            <h3 class="tariffs__title title">Base</h3>
            <p class="tariffs__card-price">2.732.850 сум</p>
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

    const CardIcon = defineAsyncComponent(() => import('~/shared/icons/tariffs/Card.vue'));
    const OkIcon = defineAsyncComponent(() => import('~/shared/icons/tariffs/Ok.vue'));
    const NoIcon = defineAsyncComponent(() => import('~/shared/icons/tariffs/No.vue'));

    const tariffsList: Ref = ref([
        {
            icon: OkIcon,
            text: 'Руная кладь 8 кг'
        },
        {
            icon: NoIcon,
            text: 'Возврат билета не разрешено'
        },
        {
            icon: CardIcon,
            text: 'Изменение в билете платно'
        },
    ])

</script>

<style lang="scss">
    @use '~/assets/styles/widgets/tariffs-card.scss';
</style>