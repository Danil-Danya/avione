<template>
    <div class="check__card">
        <div class="check__card-content">
            <div class="check__card-top">
                <h3 class="check__card-title">Данные</h3>
                <h3 class="check__card-title">CENTRUM AIR</h3>
            </div>
            <div class="check__card-center">
                <ul class="check__card-list">
                    <li class="check__card-li" v-for="item in checkList" :key="item">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="check__card-bottom">
                <p class="check__card-text">1 взрослый</p>
                <h3 class="check__card-title">2.732.850 сум</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const checkList: Ref = ref([
        'Эконом',
        'Ручная кладь: 1 сумка',
        '1 взрослый'
    ])
</script>

<style lang="scss">
    @use '~/assets/styles/widgets/check-card.scss';
</style>