<template>
    <div class="">
        <div class="passengers__content">
            <div class="passengers__head">
                <h2 class="passengers__title-profile title">{{ $t('passengerNotebookTitle') }}</h2>
                <Button
                    padding="12px 36px"
                    background="#2E4AB5"
                    :text="$t('passengerCreateButton')"
                    @click="togglePassengerModal"
                />
                <Button 
                    text="<"
                    background="#2E4AB5"
                    padding="15px 30px"
                    @click="goToBack"
                    v-if="!isMobile"
                />
                <RouterLink to="/" class="search__button" v-if="!isMobile">
                    Поиск
                </RouterLink>
            </div>
            <div class="passengers__container" v-if="passengersStore.passengers?.length">
                <PassengerCard v-for="value in passengersStore.passengers" :passenger="value" :key="value"/>
            </div>
            <PassangerModal
                v-if="isOpenPassengerModal"
                @close="togglePassengerModal"
                :is-edit="false"
            />

        </div>
    </div>
</template>

<script lang="ts" setup>

    import { useRouter } from 'vue-router';
    import PassengerCard from '~/widgets/PassengerCard.vue';
    import Pagination from '~/features/pagination/Pagination.vue';
    import Button from '~/shared-ui/ui/Button.vue';
    import PassangerModal from '~/features/modals/PassangerModal.vue';

    import { usePassengerStore } from '~/entities/passengers/models/store';
    import { useIsMobile } from '~/composables/useIsMobile';

    const isMobile = useIsMobile();

    const router = useRouter();
    const goToBack = () => {
        router.go(-1);
    }

    const passengersStore = usePassengerStore();

    await passengersStore.fetchPassengers();

    const isOpenPassengerModal = ref(false);

    const togglePassengerModal = () => {
        isOpenPassengerModal.value = !isOpenPassengerModal.value;
    }
    
</script>