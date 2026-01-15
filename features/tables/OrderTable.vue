<template>
    <div class="order__table-block">
        <table class="order__table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{{ $t('ordersTableRoute') }}</th>
                    <th>{{ $t('ordersTableDate') }}</th>
                    <th>{{ $t('ordersTablePassengers') }}</th>
                    <th>{{ $t('ordersTablePrice') }}</th>
                    <th>{{ $t('ordersTableStatus') }}</th>
                </tr>
            </thead>

            <tbody>
                <tr class="order__table-tr"
                    v-for="(item, index) in tableList" 
                    :key="index"
                    @click="goToOrder(item.order)"
                >
                    <td class="order__table-td">{{ index + 1 }}</td>

                    <td class="order__table-td">
                        <div class="order__table-cities">
                            {{ toLatinCity(item.cities.from) }}  
                            <span class="order__table-cities-icon">
                                <ArrowIcon />
                            </span>
                            {{ toLatinCity(item.cities.to) }}
                        </div>
                    </td>

                    <td class="order__table-td">{{ item.date }}</td>

                    <td class="order__table-td">
                        <span class="order__table-icon">
                            <UserIcon />
                        </span>
                        - {{ item.countPassenger }}
                    </td>

                    <td class="order__table-td">{{ item.price }} {{ $t('valute') }}</td>

                    <td class="order__table-td">
                        <span :class="['status', getStatusClass(item.status)]">
                            {{ $t(statusKey(item.status)) }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <Pagination /> -->
</template>


<script lang="ts" setup>

    import Pagination from '../pagination/Pagination.vue';
    import { useRouter } from 'vue-router';

    import { toLatinCity } from '~/utils/toLatinCity';

    const ArrowIcon = defineAsyncComponent(() => import('~/shared-ui/icons/profile/Arrow.vue'));
    const UserIcon = defineAsyncComponent(() => import('~/shared-ui/icons/profile/User.vue'));

    const props = defineProps<{
        tableList: Array
    }>()

    const router = useRouter();

    const statusKey = (status: string) => {
        switch (status) {
            case 'Выписано': return 'ordersStatusIssued';
            case 'Ожидает оплаты': return 'ordersStatusWaitingPayment';
            case 'Отменено': return 'ordersStatusCanceled';
            case 'В пути': return 'ordersStatusInTransit';
            case 'Забронированно': return 'ordersStatusBooked';
            default: return '';
        }
    }

    const goToOrder = (order) => {
        sessionStorage.setItem('order', JSON.stringify(order));
        router.replace('/profile/order');
    }

    const translateStatus = (key: keyof typeof statusTranslations) => {
        return statusTranslations[key][currentLang.value] || statusTranslations[key].ru;
    }

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

            case 'Забронированно':
                return 'status--gray';

            default:
                return 'status--gray';
        }
    };


</script>

<style lang="scss">
    @import '~/assets/styles/features/tables/orders.scss';
</style>