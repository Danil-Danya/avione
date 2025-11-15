<template>
    <div class="card__table-container">
        <div class="card__table-row" v-for="card in tableList" :key="card">
            <div class="card__table-number">{{ card.number }}</div>
            <div class="card__table-type">{{ card.type }}</div>
            <div class="card__table-date">{{ card.date }}</div>
            <div class="card__table-delete">
                <DeleteButton />
            </div>
        </div>
        <Pagination />
    </div>
</template>


<script lang="ts" setup>

    import DeleteButton from '~/shared-ui/ui/DeleteButton.vue';
    import Pagination from '../pagination/Pagination.vue';

    const tableList: Ref<object[]> = ref([
    {
        number: '8600 53** **** 2273',
        type: 'Uzcard',
        date: '07/25'
    },
    {
        number: '9860 45** **** 1198',
        type: 'Humo',
        date: '03/27'
    },
    {
        number: '4580 12** **** 8844',
        type: 'Visa',
        date: '11/26'
    },
    {
        number: '5300 77** **** 5012',
        type: 'Mastercard',
        date: '09/28'
    }
]);


</script>

<style lang="scss">
    @import '~/assets/styles/features/tables/card.scss';
</style>