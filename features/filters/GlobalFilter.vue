<template>
    <div class="global__filter">
        <div class="global__filter-selectors">
            <div class="global__filter-type">
                <NuxtLink to="/" class="global__filter-type-link">
                    <span class="global__filter-type-icon">
                        <AirplaneIcon />
                    </span>
                    <p class="global__filter-text">Авиабилеты</p>
                </NuxtLink>
                <NuxtLink to="/" class="global__filter-type-link">
                    <span class="global__filter-type-icon">
                        <TrainIcon />
                    </span>
                    <p class="global__filter-text">Ж/Д билеты</p>
                </NuxtLink>
            </div>
            <div class="global__filter-path">
                <p class="global__filter-text">Туда</p>
                <CheckBox />
                <p class="global__filter-text">Туда и обратно</p>
            </div>
        </div>
        <div class="global__filter-data">
            <div class="global__filter-input-container">
                <span class="global__filter-icon">
                    <LocationIcon />
                </span>
                <input type="text" class="global__filter-input" placeholder="Откуда">
            </div>
            <div class="global__filter-input-container">
                <span class="global__filter-icon">
                    <LocationIcon />
                </span>
                <input type="text" class="global__filter-input" placeholder="Куда">
            </div>
            <div class="global__filter-input-container">
                <span class="global__filter-icon" @click="toggleTo">
                    <CalendarIcon />
                    <p class="global__filter-text">Туда</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input data" v-if="to">
                        <VDatePicker
                            v-model="date"
                            :popover="{ visibility: 'click' }"
                            :masks="{ input: 'DD.MM.YYYY' }"
                            :attributes="[]"
                            color="#2E4AB5"
                            is-required
                        />
                    </div>
                </Transition>
            </div>
            <div class="global__filter-input-container">
                <span class="global__filter-icon" @click="toggleBack">
                    <CalendarIcon />
                    <p class="global__filter-text">Обатно</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input date" v-if="back">
                        <VDatePicker
                            v-model="date"
                            :popover="{ visibility: 'click' }"
                            :masks="{ input: 'DD.MM.YYYY' }"
                            :attributes="[]"
                            color="#2E4AB5"
                            is-required
                        />
                    </div>
                </Transition>
            </div>
            <div class="global__filter-button-container">
                <p class="global__filter-text">1 Пасажир</p>
                <p class="global__filter-text light">Эконом</p>
                <span class="global__filter-icon">
                    <ArrowIcon />
                </span>
                <Button 
                    background="#EE2532"
                    padding="8px 15px"
                    text="Найти билеты"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { defineAsyncComponent, Ref, ref } from 'vue';

    import CheckBox from '~/shared/ui/Switcher.vue';
    import Button from '~/shared/ui/Button.vue';

    const AirplaneIcon = defineAsyncComponent(() => import('~/shared/icons/filters/Airplane.vue'));
    const TrainIcon = defineAsyncComponent(() => import('~/shared/icons/filters/Train.vue'));

    const LocationIcon = defineAsyncComponent(() => import('~/shared/icons/filters/Location.vue'));
    const CalendarIcon = defineAsyncComponent(() => import('~/shared/icons/filters/Calendar.vue'));
    const ArrowIcon = defineAsyncComponent(() => import('~/shared/icons/filters/Arrow.vue'));

    const to: Ref<boolean> = ref(false);
    const back: Ref<boolean> = ref(false);

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

</script>

<style lang="scss">
    @use '~/assets/styles/features/filters/global.scss';
</style>