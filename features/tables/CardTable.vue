<template>
    <div class="card__table-container" v-if="cardsTableList.length">
        <div class="card__table-row" v-for="card in cardsTableList" :key="card">
            <div class="card__table-number" v-if="!isMobile">{{ card.number }}</div>
            <div class="card__table-number" v-else>{{ card.number.split('********')[1] }}</div>
            <div class="card__table-type">{{ card.type }}</div>
            <div class="card__table-date">{{ card.date }}</div>
            <div class="card__table-delete">
                <DeleteButton @click="openDeleteModal(card)" />
            </div>
        </div>
        <!-- <Pagination /> -->
    </div>
    <DeleteModal
        v-if="isDeleteModalOpen"
        :entity-name="$t('cardEntityName')"
        :entity-title="`${$t('cardEntityTitle')}: ${selectedCard?.number?.slice(-4)}`"
        @confirm="confirmDelete"
        @cancel="closeDeleteModal"
    />

</template>


<script lang="ts" setup>
    
    import DeleteButton from '~/shared-ui/ui/DeleteButton.vue';
    import Pagination from '../pagination/Pagination.vue';
    import DeleteModal from '../modals/DeleteModal.vue';
    
    import { useCardsStore } from '~/entities/cards/models/store';
    import { useIsMobile } from '~/composables/useIsMobile';
    import { useCardsApi } from '~/composables/cards/api';

    const isMobile: Ref<boolean> = useIsMobile();
    const cardsStore = useCardsStore();

    await cardsStore.fetchCards();

    const isDeleteModalOpen = ref(false);
    const selectedCard = ref<any | null>(null);

    const openDeleteModal = (card: any) => {
        selectedCard.value = card;
        isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
        selectedCard.value = null;
        isDeleteModalOpen.value = false;
    };

    const confirmDelete = async () => {
        if (!selectedCard.value) {
            return;
        }

        const { deleteCards } = useCardsApi()

        await deleteCards(selectedCard.value.id);
        await cardsStore.fetchCards();

        closeDeleteModal();
    };


    const cardsTableList = computed(() => {
        return cardsStore.cards.map((card) => {
            return {
                id: card.id,
                number: card.cardNumber,
                type: 'UZCARD',
                date: formatCardExpireDate(card.expireDate)
            }
        })
    })


</script>

<style lang="scss">
    @import '~/assets/styles/features/tables/card.scss';
</style>