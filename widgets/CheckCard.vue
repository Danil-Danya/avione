<template>
    <div class="check__card">
        <div class="check__card-content">
            <div class="check__card-top">
                <h3 class="check__card-title">Данные</h3>
                <h3 class="check__card-title">{{ carrierName }}</h3>
            </div>
            <div class="check__card-center">
                <ul class="check__card-list">
                    <li class="check__card-li" v-for="item in checkList" :key="item">
                        {{ item.title }} {{ item.value }}
                    </li>
                </ul>
            </div>
            <div class="check__card-bottom">
                <p class="check__card-text">{{ route.query.adult_count }} взрослых</p>
                <h3 class="check__card-title">{{ formatNumber(price) }} сум</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useRoute } from 'vue-router';
    import { useTicketStore } from '~/entities/tickets/models/store';
    import { formatNumber } from '~/utils/formatNumber';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const ticketStore = useTicketStore();
    
    const props = defineProps<{
        price,
        carrierName,
    }>();
    
    const route = useRoute()

    const selectedTariff = computed(() => {
        const tariffId = route.query.tariff_id;

        if (!tariffId) {
            return null;
        }

        return ticketStore.tariffs.find(t => t.id === tariffId) || null;
    });


    const checkList = computed(() => {
        if (!selectedTariff.value) {
            return [];
        }

        return [
            {
                title: t('checkCardTariff'),
                value: selectedTariff.value.title
            },
            {
                title: t('checkCardHandLuggage'),
                value: selectedTariff.value.handLuggage
            },
            {
                title: t('checkCardBaggage'),
                value: selectedTariff.value.baggage
            }
        ].filter(i => i.value);
    });

    watch(
        () => ticketStore.tariffs,
        (tariffs, prevTariffs) => {
            if (!tariffs.length) {
                return;
            }
        },
        { immediate: true }
    );


    watch(
        () => route.query.tariff_id,
        (newId, oldId) => {
            if (newId === oldId) {
                return;
            }

            // Тут НИЧЕГО делать не надо,
            // selectedTariff обновится сам
            // watch нужен, если дальше понадобится логика
        },
        { immediate: true }
    );

</script>

<style lang="scss">
    @import '~/assets/styles/widgets/check-card.scss';
</style>