<template>
    <form class="payment__form">
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">{{ $t('paymentSelectCard') }}</h3>

                <select
                    class="input payment__form-select"
                    v-model="cardPayload.cardId"
                >
                    <option
                        v-for="card in cardStore.cards"
                        :key="card.id"
                        :value="card.id"
                        v-if="cardStore.cards.length"
                    >
                        {{ card.cardNumber }}
                    </option>
                    <!-- <option v-else>
                        Вы еще не добавили карту
                    </option> -->
            </select>
        </div>

    </form>
</template>

<script setup lang="ts">

    import { reactive, ref, watch } from "vue";
    import { useRoute } from "vue-router";

    import { useCardsStore } from "~/entities/cards/models/store";

    const route = useRoute();
    const cardStore = useCardsStore();

    await cardStore.fetchCards();

    console.log(cardStore.cards);
    

    const cardPayload = reactive({
        cardId: null as number | null
    });

    watch(
        () => cardPayload.cardId,
        (val) => {
            if (!val) {
                return;
            }

            emit('update:cardData', {
                type: 'saved',
                cardId: val
            });
        }
    );


    const emit = defineEmits(["update:cardData"]);


</script>
