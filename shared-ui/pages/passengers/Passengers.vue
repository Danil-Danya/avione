<template>
    <div class="passengers">
        <div class="passengers__content">
            <h2 class="passengers__title-profile title">Записная книжка</h2>
            <div class="passengers__container">
                <PassengerCard v-for="value in 5" :key="value"/>
            </div>
            <Pagination />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import PassengerCard from '~/widgets/PassengerCard.vue';
    import Pagination from '~/features/pagination/Pagination.vue';
</script>