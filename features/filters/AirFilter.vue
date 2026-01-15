<template>
    <div class="air__filter">
        <div class="air__filter-content">
            <div class="air__filter-block">
                <h3 class="air__filter-title">{{ $t('filterBaggage') }}</h3>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">{{ $t('filterWithBaggage') }}</p>
                    <div class="air__filter-checkbox-info">
                        <CheckBox v-model="filters.baggage" />
                    </div>
                </div>
            </div>
            <div class="air__filter-block">
                <h3 class="air__filter-title">{{ $t('filterTransfers') }}</h3>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">{{ $t('filterDirectOnly') }}</p>
                    <div class="air__filter-checkbox-info">
                        <CheckBox v-model="filters.direct" />
                    </div>
                </div>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">{{ $t('filter1Transfer') }}</p>
                    <div class="air__filter-checkbox-info">
                        <CheckBox v-model="filters.oneStop" />
                    </div>
                </div>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">{{ $t('filter2MoreTransfers') }}</p>
                    <div class="air__filter-checkbox-info">
                        <CheckBox v-model="filters.multiStop" />
                    </div>
                </div>
            </div>
            <div class="air__filter-block">
                <h3 class="air__filter-title">{{ $t('filterFromTo') }}</h3>
                <div class="air__filter-range-container">
                    <p class="air__filter-text">{{ $t('filterArrivalTime') }}</p>
                    <div class="slider-wrapper">
                        <div class="air__filter-date">
                            <span class="time-label">{{ formatTime(departure[0]) }}</span>
                            <span class="time-label">{{ formatTime(departure[1]) }}</span>
                        </div>

                        <Slider
                            v-model="departure"
                            :min="0"
                            :max="24"
                            :step="1"
                            :tooltips="false"
                            :lazy="true"
                            class="custom-slider"
                        />

                    </div>
                </div>
                <div class="air__filter-range-container">
                    <p class="air__filter-text">{{ $t('filterArrivalTime') }}</p>
                    <div class="slider-wrapper">
                        <div class="air__filter-date">
                            <span class="time-label">{{ formatTime(departure[0]) }}</span>
                            <span class="time-label">{{ formatTime(departure[1]) }}</span>
                        </div>

                        <Slider
                            v-model="departure"
                            :min="0"
                            :max="24"
                            :step="1"
                            :tooltips="false"
                            :lazy="true"
                            class="custom-slider"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="air__filter-block">
                <h3 class="air__filter-title">Стамбул - Ташкент</h3>
                <div class="air__filter-range-container">
                    <p class="air__filter-text">Время вылета</p>
                    <div class="slider-wrapper">
                        <div class="air__filter-date">
                            <span class="time-label">{{ formatTime(departure[0]) }}</span>
                            <span class="time-label">{{ formatTime(departure[1]) }}</span>
                        </div>

                        <Slider
                            v-model="departure"
                            :min="0"
                            :max="24"
                            :step="1"
                            :tooltips="false"
                            :lazy="true"
                            class="custom-slider"
                        />
                    </div>
                </div>
                <div class="air__filter-range-container">
                    <p class="air__filter-text">Время прилета</p>
                    <div class="slider-wrapper">
                        <div class="air__filter-date">
                            <span class="time-label">{{ formatTime(departure[0]) }}</span>
                            <span class="time-label">{{ formatTime(departure[1]) }}</span>
                        </div>

                        <Slider
                            v-model="departure"
                            :min="0"
                            :max="24"
                            :step="1"
                            :tooltips="false"
                            :lazy="true"
                            class="custom-slider"
                        />
                    </div>
                </div>
            </div> -->
            <div class="air__filter-block">
                <h3 class="air__filter-title">{{ $t('filterMaxPrice') }}</h3>
                <div class="air__filter-range-container">
                    <div class="slider-wrapper">
                        <div class="air__filter-date">
                            <span class="time-label">{{ formatNumber(filters.maxPrice) }} {{ $t('valute') }}</span>
                        </div>

                        <Slider
                            v-model="filters.maxPrice"
                            :min="0"
                            :max="500000000"
                            :step="500000"
                            :tooltips="false"
                            :lazy="true"
                            class="custom-slider"
                        />
                    </div>
                </div>
            </div>

            <div class="air__filter-block">
                <h3 class="air__filter-title">{{ $t('sectionAirlines') }}</h3>
                <div class="air__filter-range-container">
                    <Input :placeholder="$t('placeholderSearchAirline')" width="100%" />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">

    import CheckBox from '~/shared-ui/ui/Checkbox.vue';
    import formatTime from '~/utils/formatTime';
    import Input from '~/shared-ui/ui/Input.vue';

    import { useRoute, useRouter } from 'vue-router';
    import { formatNumber } from '~/utils/formatNumber';

    const route = useRoute();
    const router = useRouter();

    const filters = ref({
        baggage: false,
        direct: false,
        oneStop: false,
        multiStop: false,
        maxPrice: 15000000
    });


    const departure = ref([0, 24])

    const timeMarks = {
        0: '00:00',
        6: '06:00',
        12: '12:00',
        18: '18:00',
        24: '23:59',
    }

    watch(filters, (val) => {
        if (route.query.ticket_id) {
            return;
        }
        
        router.replace({
            query: {
                ...route.query,
                search_with_baggage: val.baggage ? true : false,
                direct: val.direct ? 1 : undefined,
                one_stop: val.oneStop ? 1 : undefined,
                multi_stop: val.multiStop ? 1 : undefined,
                max_price: val.maxPrice ?? 500000000
            }
        });
    }, { deep: true });


    onMounted(() => {
        const q = route.query;

        filters.value.baggage = q.baggage === "1";
        filters.value.direct = q.direct === "1";
        filters.value.oneStop = q.one_stop === "1";
        filters.value.multiStop = q.multi_stop === "1";
        filters.value.maxPrice = q.max_price ? Number(q.max_price) : null;
    });


</script>

<style lang="scss">
    @import '~/assets/styles/features/filters/air.scss';
</style>