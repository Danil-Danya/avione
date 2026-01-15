<template>
    <div class="autocomplete" @click.stop>
        <input 
            type="text"
            class="global__filter-input"
            :placeholder="placeholder"
            v-model="query"
            @input="handleInput"
            @focus="open = true"
            @click="query = ''"
        />

        <ul v-if="open && cityResults.length > 0" class="autocomplete__list">

            <li 
                v-for="city in cityResults"
                :key="city.id"
                class="autocomplete__city"
            >
                <div class="city-row" @click="selectCity(city)">
                    <div class="city-title">{{ city.name }}</div>
                    <div class="city-code">{{ city.code }}</div>
                </div>

                <div 
                    v-for="airport in city.airports"
                    :key="airport.id"
                    class="airport-row"
                    @click.stop="selectAirport(city, airport)"
                >
                    <div class="airport-title">{{ airport.name }}</div>
                    <!-- <div class="airport-code">{{ airport.code }}</div> -->
                </div>
            </li>

        </ul>
    </div>
</template>


<script setup lang="ts">
import { useAirportsApi } from '~/composables/airports/lib/useApi';
import { ref, computed, watch, onMounted } from 'vue';
import { transliterate } from '~/utils/transliterate';

const airportsApi = useAirportsApi();

const props = defineProps<{
    modelValue: any;
    placeholder: string;
}>();

const emit = defineEmits(['update:modelValue']);

const query = ref('');
const open = ref(false);
let timeout: any = null;
const apiData = ref<any | null>(null);

const cityResults = computed(() => {
    if (!apiData.value) return [];

    const countries = apiData.value.payload?.data || [];
    if (countries) {
        return countries.flatMap(country =>
            country.cities.map(city => ({
                id: city.id,
                name: city.name,
                code: city.code,
                airports: (city.airpors || []).filter(a => a.name && a.name.trim().length > 0)
            }))
        );
    }
});

const prefetchDefaultValue = async (val: any) => {
    if (!val) return;

    const cityName = val.cityName || val.name;

    if (!cityName) return;

    query.value = cityName;

    apiData.value = await airportsApi.getAirportsWithFilter(cityName, 10, 1);

    open.value = true;
};

watch(
    () => props.modelValue,
    async (val) => {
        if (!val) return;

        if (typeof val === 'string') {
            query.value = val;
            return;
        }
        if (Object.keys(val).length === 0) {
            return;
        }
        if (!val.cityName) {
            return;
        }
        query.value = val.cityName;

        await prefetchDefaultValue(val);
    },
    { immediate: true }
);

const handleInput = () => {
    open.value = true;
    debounceSearch(query.value);
};

const debounceSearch = (text: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fetchAirports(text), 300);
};

const fetchAirports = async (text: string) => {
    if (!text || text.length < 1) {
        apiData.value = null;
        return;
    }

    apiData.value = await airportsApi.getAirportsWithFilter(text, 10, 1);
};

const selectCity = (city: any) => {
    query.value = city.name;
    open.value = false;

    emit('update:modelValue', city.name);
};

const selectAirport = (city: any, airport: any) => {
    query.value = city.name; 
    open.value = false;

    emit('update:modelValue', city.name);
};

onMounted(() => {
    document.body.addEventListener('click', () => (open.value = false));
});
</script>

