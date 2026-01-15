<template>
    <ClientOnly>
        <Head />
        <!-- <Flight /> -->
        <Assortment />
    </ClientOnly>
</template>

<script lang="ts" setup>

    import { useRoute } from 'vue-router';

    import { useAirportsApi } from '~/composables/airports/lib/useApi';
    import { useTicketStore } from '~/entities/tickets/models/store';

    import Head from '~/shared-ui/pages/from-to/Head.vue';
    import Flight from '~/shared-ui/pages/from-to/Flight.vue';
    import Assortment from '~/shared-ui/pages/from-to/Assortment.vue';

    const airFilter = ref<AirFilter | null>(null);

    const route = useRoute();

    const apiAirports = useAirportsApi();
    const ticketsStore = useTicketStore();
    
    const fromCityId: Ref<number> = ref(0);
    const toCityId: Ref<number> = ref(0);

    const calculateCitiesId = async () => {
        const fromName = String(route.params.from).trim();
        const toName = String(route.params.to).trim();

        const resFrom = await apiAirports.getAirportsWithFilter(fromName);
        const resTo = await apiAirports.getAirportsWithFilter(toName);

        fromCityId.value = findCityId(resFrom, fromName);
        toCityId.value = findCityId(resTo, toName);
    };

    const findCityId = (response: any, cityName: string): number => {
        if (!response?.payload?.data) {
            return 0;
        }

        const nameLower = cityName.toLowerCase();

        for (const country of response.payload.data) {
            for (const city of country.cities) {

                if (city.name.toLowerCase() === nameLower) {
                    return city.id;
                }

                if (city.keywords?.toLowerCase().includes(nameLower)) {
                    return city.id;
                }
            }
        }

        return 0;
    };

    const getTodayDate = (): string => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };


    const buildAirFilter = () => {
        const query = route.query;

        const fromDate = String(query.from_date || getTodayDate()).trim();
        const toDate = String(query.to_date || '').trim();

        const roundTrip = !!toDate && toDate !== 'undefined';

        const directions: Direction[] = [];

        directions.push({
            departureCityId: fromCityId.value,
            arrivalCityId: toCityId.value,
            date: fromDate,
        });

        if (roundTrip) {
            directions.push({
                departureCityId: toCityId.value,
                arrivalCityId: fromCityId.value,
                date: toDate,
            });
        }

        airFilter.value = {
            directions,
            airlines: null,
            maxPrice: Number(query.max_price || undefined),
            searchWithBaggage: query.search_with_baggage === 'true',
            refundAllowedOnly: Boolean(Number(query.refund_only || false)),
            class: Number(query.class || 0),
            adultCount: Number(query.adult_count || 1),
            childCount: Number(query.child_count || 0),
            infantCount: Number(query.infant_count || 0),
            // stopMaxMinutes: 10
        };

        console.log("FINAL AIR FILTER:", airFilter.value);
    };

    const updateFilter = async () => {
        ticketsStore.tickets = [];
            
        if (!fromCityId.value || !toCityId.value) {
            return;
        }

        buildAirFilter();

        const directsFilter = { ...airFilter.value, direction: airFilter.value.directions[0] };

        await Promise.all([
            ticketsStore.fetchTickets(airFilter.value),
            ticketsStore.fetchDirects(directsFilter)
        ]);

    }

    watch(
        () => route.query,
        async () => {
            if (route.query.ticket_id) {
                return;
            }
            await updateFilter();
        },
        { deep: true }
    );

    watch(
        () => route.params,
        async () => {
            await updateFilter();
        },
        { deep: true }
    );


    onMounted(async () => {
        if (!route.query.ticket_id) {
            await calculateCitiesId();
            buildAirFilter();
    
            const directsFilter = { ...airFilter.value, direction: airFilter.value.directions[0] };

            await Promise.all([
                ticketsStore.fetchTickets(airFilter.value),
                ticketsStore.fetchDirects(directsFilter)
            ]);

        }
    })

    definePageMeta({
        layout: 'site-layout',
         ssr: false
    })

</script>