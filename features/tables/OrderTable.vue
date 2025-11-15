<template>
    <div class="order__table-block">
        <table class="order__table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Маршрут</th>
                    <th>Дата</th>
                    <th>Пассажиры</th>
                    <th>Цена</th>
                    <th>Статус</th>
                </tr>
            </thead>

            <tbody>
                <tr class="order__table-tr"
                    v-for="(item, index) in tableList" 
                    :key="index"
                >
                    <td class="order__table-td">{{ index + 1 }}</td>

                    <td class="order__table-td">
                        <div class="order__table-cities">
                            {{ item.cities.from }}  
                            <span class="order__table-cities-icon">
                                <ArrowIcon />
                            </span>
                            {{ item.cities.to }}
                        </div>
                    </td>

                    <td class="order__table-td">{{ item.date }}</td>

                    <td class="order__table-td">
                        <span class="order__table-icon">
                            <UserIcon />
                        </span>
                        - {{ item.countPassenger }}
                    </td>

                    <td class="order__table-td">{{ item.price }} сум</td>

                    <td class="order__table-td">
                        <span :class="['status', getStatusClass(item.status)]">
                            {{ item.status }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination />
    </div>
</template>


<script lang="ts" setup>

    import Pagination from '../pagination/Pagination.vue';

    const ArrowIcon = defineAsyncComponent(() => import('~/shared-ui/icons/profile/Arrow.vue'));
    const UserIcon = defineAsyncComponent(() => import('~/shared-ui/icons/profile/User.vue'));

    const tableList: Ref<object[]> = ref([
        {
            cities: {
                from: 'Ташкент',
                to: 'Москва'
            },
            date: '10.29.2025',
            countPassenger: 1,
            price: '2.570.000',
            status: 'Выписано'
        },
        {
            cities: {
                from: 'Самарканд',
                to: 'Дубай'
            },
            date: '11.05.2025',
            countPassenger: 2,
            price: '6.420.000',
            status: 'Оплата'
        },
        {
            cities: {
                from: 'Бухара',
                to: 'Стамбул'
            },
            date: '12.18.2025',
            countPassenger: 3,
            price: '9.750.000',
            status: 'Отменено'
        },
        {
            cities: {
                from: 'Фергана',
                to: 'Сеул'
            },
            date: '01.09.2026',
            countPassenger: 1,
            price: '4.880.000',
            status: 'В пути'
        },
        {
            cities: {
                from: 'Нукус',
                to: 'Астана'
            },
            date: '02.14.2026',
            countPassenger: 4,
            price: '3.210.000',
            status: 'Выписано'
        },
        {
            cities: {
                from: 'Ташкент',
                to: 'Куала-Лумпур'
            },
            date: '03.01.2026',
            countPassenger: 1,
            price: '7.900.000',
            status: 'Ожидание'
        }
    ]);

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'Выписано': 
                return 'status--green';

            case 'Ожидает оплаты': 
                return 'status--yellow';

            case 'Отменено': 
                return 'status--red';

            case 'В пути': 
                return 'status--blue';

            case 'Ожидание':
                return 'status--gray';

            default:
                return 'status--gray';
        }
    };


</script>

<style lang="scss">
    @import '~/assets/styles/features/tables/orders.scss';
</style>