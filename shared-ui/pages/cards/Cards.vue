<template>
    <div class="card">
        <div class="card__content">

            <CardTable />

            <div class="card__form-block">
                <h3 class="card__form-title">{{ $t('cardFormTitle') }}</h3>
                <PaymentForm @update:cardData="cardData = $event" />
                <GlobalPreloader v-if="isLoad" />
                <Button 
                    background="#2E4AB5" 
                    padding="5px" 
                    :text="$t('saveCardButton')" 
                    class="card__form-button" 
                    @click="createNewCard" 
                />
            </div>
        </div>

        <CardModal
            v-if="showOtpModal"
            :card-id="otpCard.cardId"
            :session-id="otpCard.sessionId"
            :code="otpCard.code"
            @closeModal="showOtpModal = false"
            @submitOtp="handleOtpSubmit"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineAsyncComponent } from 'vue';

import PaymentForm from '~/features/forms/PaymentForm.vue';
import Button from '~/shared-ui/ui/Button.vue';
import { useCardsApi } from '~/composables/cards/api';
import GlobalPreloader from '~/features/preloaders/GlobalPreloader.vue';

const CardTable = defineAsyncComponent(() => import('~/features/tables/CardTable.vue'));
const CardModal = defineAsyncComponent(() => import('~/features/modals/CardModal.vue'));

const isLoad = ref(false);

interface CardData {
    pan: string;
    expireDate: string;
}

interface OtpCard {
    cardId: number | string;
    sessionId: string;
    code: string;
}

const cardData = ref<CardData>({
    pan: '',
    expireDate: ''
});

const showOtpModal = ref(false);
const otpCard = ref<OtpCard>({
    cardId: '',
    sessionId: '',
    code: ''
});

const { createCard, confirmCard } = useCardsApi();

const createNewCard = async () => {
    isLoad.value = true;
    if (!cardData.value.pan || !cardData.value.expireDate) return;

    const normalizedPan = cardData.value.pan.replace(/\s+/g, '');
    const normalizedExpiry = cardData.value.expireDate.replace('/', '');

    const cardApi = useCardsApi();

    const createdCard = await cardApi.createCards({
        pan: normalizedPan,
        expireDate: normalizedExpiry,
        saveCard: true
    });

    if (createdCard?.payload) {
        isLoad.value = false;
        otpCard.value = {
            cardId: createdCard.payload.cardId,
            sessionId: createdCard.payload.sessionId,
            code: createdCard.payload.code
        };

        showOtpModal.value = true;
    }

    if (createdCard.error) {
        isLoad.value = false;
    }
};

// const handleOtpSubmit = async (otp: string) => {
//     if (!otpCard.value.cardId || !otpCard.value.sessionId) return;

//     try {
//         await confirmCard({
//             cardId: otpCard.value.cardId,
//             sessionId: otpCard.value.sessionId,
//             code: otp
//         });

//         //showOtpModal.value = false;
//     }
//     catch (err) {
//         console.error('Ошибка подтверждения карты:', err);
//     }
// };
</script>

<style lang="scss">
@import '~/assets/styles/shared/pages/card.scss';
</style>
