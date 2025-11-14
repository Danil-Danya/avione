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
                <Switcher v-model="isActiveSwitch" />
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
            <div class="global__filter-input-container calendar">
                <span class="global__filter-icon" @click.prevent.stop="toggleTo">
                    <CalendarIcon />
                    <p v-if="!dateTo">Туда</p>
                    <p v-else>{{ formattedDateTo }}</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input data" v-if="to">
                        <VDatePicker
                        v-model="dateTo"
                        :popover="{ visibility: 'click' }"
                        :masks="{ input: 'DD.MM.YYYY' }"
                        :attributes="[]"
                        color="#2E4AB5"
                        is-required
                        />
                    </div>
                </Transition>
            </div>
            <div class="global__filter-input-container calendar" v-if="isActiveSwitch">
                <span class="global__filter-icon" @click.prevent.stop="toggleBack">
                    <CalendarIcon />
                    <p v-if="!dateBack">Обратно</p>
                    <p v-else>{{ formattedDateBack }}</p>
                </span>
                <Transition name="calendar">
                    <div class="calendar-input date" v-if="back">
                        <VDatePicker
                            v-model="dateBack"
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
                <div class="global__filter-button-text">
                    <p class="global__filter-text light">Эконом</p>
                    <span class="global__filter-icon">
                        <ArrowIcon />
                    </span>
                </div>
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
    import { useFormattedDate } from '~/composables/useFormateDate.ts';

    import Switcher from '~/shared-ui/ui/Switcher.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const AirplaneIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Airplane.vue'));
    const TrainIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Train.vue'));

    const LocationIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Location.vue'));
    const CalendarIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Calendar.vue'));
    const ArrowIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Arrow.vue'));

    const to: Ref<boolean> = ref(false);
    const back: Ref<boolean> = ref(false);

    const isActiveSwitch: Ref<boolean> = ref(true);


    const dateBack = ref<Date | null>(null);
    const dateTo = ref<Date | null>(null);

    const { formatted: formattedDateBack } = useFormattedDate(dateBack);
    const { formatted: formattedDateTo } = useFormattedDate(dateTo);

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

    onMounted(() => {
        document.body.addEventListener('click', () => closeAllCalendars());
    })

</script>

<style lang="scss">
    @import '~/assets/styles/features/filters/global.scss';
</style>