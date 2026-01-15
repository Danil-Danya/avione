<template>
    <div class="global__filter">
        <div class="global__filter-selectors">
            <div class="global__filter-type">
                <NuxtLink to="/" class="global__filter-type-link">
                    <span class="global__filter-type-icon">
                        <AirplaneIcon />
                    </span>
                    <p class="global__filter-text">{{ $t('tabFlights') }}</p>
                </NuxtLink>
                <NuxtLink to="/" class="global__filter-type-link">
                    <span class="global__filter-type-icon">
                        <TrainIcon />
                    </span>
                    <p class="global__filter-text">{{ $t('tabRailway') }}</p>
                </NuxtLink>
            </div>
            <div class="global__filter-path">
                <p class="global__filter-text">{{ $t('tabTo') }}</p>
                <Switcher v-model="isActiveSwitch" />
                <p class="global__filter-text">{{ $t('labelRoundTrip') }}</p>
            </div>
        </div>
        <div class="global__filter-data">
            <div class="global__filter-input-container">
                <span class="global__filter-icon">
                    <LocationIcon />
                </span>
                <InputAutocomplete :placeholder="$t('fromCity')" v-model="filtersData.fromCity" />
            </div>
            <div class="global__filter-swapper" @click="swapCities">
                <SwapperIcon />
            </div>
            <div class="global__filter-input-container">
                <span class="global__filter-icon">
                    <LocationIcon />
                </span>
                <InputAutocomplete v-model="filtersData.toCity" :placeholder="$t('toCity')" />
            </div>
            <div class="global__filter-input-container calendar" @click.prevent.stop="toggleTo">
                <span class="global__filter-icon">
                    <CalendarIcon />
                    <p v-if="!dateTo">{{ $t('inputDateTo') }}</p>
                    <p v-else>{{ formattedDateToHuman }}</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input data" v-if="to">
                        <VDatePicker
                            @click.stop
                            v-model="dateTo"
                            :popover="{ visibility: 'click' }"
                            :masks="{ input: 'DD.MM.YYYY'}"
                            :attributes="[]"
                            :columns="!isMobile ? 2 : 1"
                            color="#2E4AB5"
                            is-required
                            :min-date="new Date()"
                        />
                    </div>
                </Transition>
            </div>
            <div class="global__filter-input-container calendar" v-if="isActiveSwitch">
                <span class="global__filter-icon" @click.prevent.stop="toggleBack">
                    <CalendarIcon />
                    <p v-if="!dateBack">{{ $t('inputDateBack') }}</p>
                    <p v-else>{{ formattedDateBackHuman }}</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input date" v-if="back">
                        <VDatePicker
                            class="calendar-input-el"
                            @click.stop
                            v-model="dateBack"
                            :popover="{ visibility: 'click' }"
                            :masks="{ input: 'DD.MM.YYYY' }"
                            :attributes="[]"
                            :columns="!isMobile ? 2 : 1"
                            color="#2E4AB5"
                            is-required
                            :min-date="dateTo ?? new Date()"
                        />
                    </div>
                </Transition>
            </div>
            <div class="global__filter-button-container">
                <PassengersDropdown v-model="filtersData" />
                <Button 
                    background="#EE2532"
                    padding="8px 15px"
                    :text="$t('buttonSearch')"
                    @click="goToFilter"
                />
            </div>
        </div>
        <div v-if="loading" class="global__filter-loader">
            <div class="bar" :style="{ width: `${progress}%` }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

    // привет, я знаю что компонент перегруженный и нет норамльных типов
    // у меня сильно жали сроки и не работало пол апи, по этому вышел такой раздутый недофильтр

    import { defineAsyncComponent, Ref, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { transliterate } from '~/utils/transliterate';

    import { useFormattedDate } from '~/composables/useFormateDate.ts';
    import { useIsMobile } from '~/composables/useIsMobile';
    import { toHumanDate, toUrlDate } from '~/utils/formatDate';
    import { useTicketStore } from '~/entities/tickets/models/store';

    import { isoToHumanDate } from '~/utils/formatDate';

    import InputAutocomplete from '~/shared-ui/ui/InputAutocomplete.vue';
    import PassengersDropdown from '~/widgets/PassengersDropdown.vue';
    import Switcher from '~/shared-ui/ui/Switcher.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const AirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Airplane.vue'));
    const TrainIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Train.vue'));

    const LocationIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Location.vue'));
    const CalendarIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Calendar.vue'));
    const SwapperIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/Swiper.vue'));

    const router = useRouter();
    const route = useRoute();

    const isMobile = useIsMobile();

    const to: Ref<boolean> = ref(false);
    const back: Ref<boolean> = ref(false);

    const isActiveSwitch: Ref<boolean> = ref(false);
    const loading = ref(false);


    const dateBack = ref<Date | null>(null);
    const dateTo = ref<Date | null>(null);

    const formattedDateToHuman = computed(() => toHumanDate(dateTo.value));
    const formattedDateBackHuman = computed(() => toHumanDate(dateBack.value));

    // const fromUrl = computed(() => toUrlDate(dateTo.value));
    // const toUrl = computed(() => toUrlDate(dateBack.value));


    const today = () => new Date().toISOString().split('T')[0];

    const filtersData = reactive({
        fromCity: route.params.from ? route.params.from : '',
        toCity: route.params.to ? route.params.to : '',
        fromDate: '',
        toDate: '',
        searchWithBaggage: false,
        class: 0,
        adultCount: 1,
        childCount: 0,
        infantCount: 0,
    });

    const swapCities = () => {
        const temp = filtersData.fromCity;
        filtersData.fromCity = filtersData.toCity;
        filtersData.toCity = temp;

        console.log('swap', filtersData.fromCity, filtersData.toCity);

        // if (filtersData.fromCity && filtersData.toCity) {
        //     router.replace({
        //         path: `/avia/${filtersData.fromCity.toLowerCase()}-${filtersData.toCity.toLowerCase()}`,
        //         query: {
        //             ...route.query
        //         }
        //     });
        // }
    };

    const ticketStore = useTicketStore();

    const goToFilter = () => {
        if (!filtersData.fromCity || !filtersData.toCity) {
            return;
        }

        ticketStore.tickets = [];
        ticketStore.directs = [];

        const query: Record<string, any> = {};

        const fromUrl = toUrlDate(dateTo.value);
        query.from_date = fromUrl || toUrlDate(new Date());

        if (isActiveSwitch.value && dateBack.value) {
            const backUrl = toUrlDate(dateBack.value);
            if (backUrl) {
                query.to_date = backUrl;
            }
        }

        query.adult_count = filtersData.adultCount || 1;

        if (filtersData.childCount > 0) {
            query.child_count = filtersData.childCount;
        }

        if (filtersData.infantCount > 0) {
            query.infant_count = filtersData.infantCount;
        }

        if (filtersData.searchWithBaggage) {
            query.search_with_baggage = false;
        }

        if (!filtersData.maxPrice) {
            query.max_price = 500000000;
        }

        query.class = filtersData.class;

        router.replace({
            path: `/avia/${filtersData.fromCity.toLowerCase()}-${filtersData.toCity.toLowerCase()}`,
            query
        });
    };


    const toggleTo = () => {
        to.value = !to.value;

        if (back.value && to.value) {
            back.value = false;
        }
    }

    const toggleBack = () => {
        back.value = !back.value;

        if (back.value && to.value) {
            to.value = false;
        }
    }

    const closeAllCalendars = () => {
        back.value = false;
        to.value = false;
    }

    watch(
        () => route.query,
        (query) => {
            if (query.from_date) {
                const d = new Date(String(query.from_date));
                if (!isNaN(d.getTime())) {
                    dateTo.value = d;
                }
            }
            else {
                dateTo.value = null;
            }

            if (query.to_date) {
                const d = new Date(String(query.to_date));
                if (!isNaN(d.getTime())) {
                    isActiveSwitch.value = true;
                    dateBack.value = d;
                }
            }
            else {
                dateBack.value = null;
            }

            filtersData.adultCount = query.adult_count ? Number(query.adult_count) : 1;
            filtersData.childCount = query.child_count ? Number(query.child_count) : 0;
            filtersData.infantCount = query.infant_count ? Number(query.infant_count) : 0;

            if (query.search_with_baggage !== undefined) {
                filtersData.searchWithBaggage = query.search_with_baggage === 'false';
            }

            if (query.class !== undefined) {
                filtersData.class = Number(query.class);
            }
        },
        { immediate: true, deep: true }
    );

    watch(dateTo, (val) => {
        if (!val) {
            return;
        }

        to.value = false;

        if (isActiveSwitch.value) {
            back.value = true;
        }
    });

    watch(dateBack, (val) => {
        if (!val) {
            return;
        }

        back.value = false;
    });

    onMounted(() => {
        document.body.addEventListener('click', () => closeAllCalendars());

        const pathWithoutLocale = route.path.replace(/^\/(ru|uz)/, '');

        if (pathWithoutLocale.startsWith('/napravlenie/tashkent/')) {
            filtersData.fromCity = 'tashkent';
            const deleter = pathWithoutLocale.split('/');
            filtersData.toCity = deleter[deleter.length - 1];
        }
    })

    watch(
        () => ticketStore.tickets,
        (tickets) => {
            if (!route.query.from_date) {
                loading.value = false;
                return;
            }

            if (tickets.length === 0) {
                loading.value = true;
            } else {
                setTimeout(() => {
                    loading.value = false;
                }, 300); 
            }
        },
        { deep: true, immediate: true }
    );

</script>

<style lang="scss">
    @import '~/assets/styles/features/filters/global.scss';
</style>