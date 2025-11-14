<template>
    <div class="air__filter">
        <div class="air__filter-content">
            <div class="air__filter-block">
                <h3 class="air__filter-title">Багаж</h3>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">С багажом</p>
                    <div class="air__filter-checkbox-info">
                        <p class="air__filter-price">6.732.850 сум</p>
                        <CheckBox />
                    </div>
                </div>
            </div>
            <div class="air__filter-block">
                <h3 class="air__filter-title">Пересадки</h3>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">Прямые рейсы</p>
                    <div class="air__filter-checkbox-info">
                        <p class="air__filter-price">6.732.850 сум</p>
                        <CheckBox />
                    </div>
                </div>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">1 пересадка</p>
                    <div class="air__filter-checkbox-info">
                        <p class="air__filter-price">6.732.850 сум</p>
                        <CheckBox />
                    </div>
                </div>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">2 и более </p>
                    <div class="air__filter-checkbox-info">
                        <p class="air__filter-price">6.732.850 сум</p>
                        <CheckBox />
                    </div>
                </div>
                <div class="air__filter-checkbox-container">
                    <p class="air__filter-text">С багажом</p>
                    <div class="air__filter-checkbox-info">
                        <p class="air__filter-price">6.732.850 сум</p>
                        <CheckBox />
                    </div>
                </div>
            </div>
            <div class="air__filter-block">
                <h3 class="air__filter-title">Ташкент - Стамбул</h3>
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
            </div>
            <div class="air__filter-block">
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
            </div>
            <div class="air__filter-block">
                <h3 class="air__filter-title">Длительность пересадок</h3>
                <div class="air__filter-range-container">
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
        </div>
    </div>
</template>

<script setup lang="ts">

    import CheckBox from '~/shared-ui/ui/Checkbox.vue';
    import formatTime from '~/utils/formatTime';

    const departure = ref([0, 24])

    const timeMarks = {
        0: '00:00',
        6: '06:00',
        12: '12:00',
        18: '18:00',
        24: '23:59',
    }

</script>

<style lang="scss">
    @import '~/assets/styles/features/filters/air.scss';
</style>