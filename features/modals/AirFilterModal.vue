<template>
    <div class="modal filter__modal">
        <div class="filter__modal-content">
            <div class="filter__modal-head">
                <h2 class="title">Настройка фильтра</h2>
                <span class="filter__modal-icon" @click="onCloseModal">
                    <CloseIcon />
                </span>
            </div>
            <div class="filter__modal-wrapper">
                <AirFilter />
                <Button padding="15px" background="#2E4AB5" text="Применить фильтр" class="filter__modal-button" @click="applyFilter" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useRouter } from 'vue-router';

    import Button from '~/shared-ui/ui/Button.vue';

    const CloseIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/Close.vue')); 
    const AirFilter = defineAsyncComponent(() => import(`~/features/filters/AirFilter.vue`));

    const emits = defineEmits(['closeModal']);

    const router = useRouter();

    const onCloseModal = () => {
        emits('closeModal');
    };

    const applyFilter = () => {
        router.replace({
            query: {
                baggage: 'true',
                stops: '0',
                departure_from: '0',
                departure_to: '24',
                arrival_from: '0',
                arrival_to: '24'
            }
        });

        onCloseModal();
    };


</script>

<style lang="scss">
    @import '~/assets/styles/features/modals/filter.scss';
</style>