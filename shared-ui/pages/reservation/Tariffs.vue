<template>
    <section class="tariffs">
        <div class="container">
            <div class="tariffs__content">
                <h2 class="tariffs__title title">Выберите тариф</h2>
                <div class="tariffs__container">
                    <TariffsCard v-for="(value, index) in 4" 
                        :class="{ active: activeIndex === index }" 
                        @click="setActive(index)"
                        :key="value" 
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import TariffsCard from '~/widgets/TariffsCard.vue';

    const activeIndex = ref<number | null>(1)

    const setActive = (index: number) => {
        activeIndex.value = index
    }
</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/tariffs.scss';
</style>