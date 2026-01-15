<template>
    <form class="payment__form">
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">Код подтверждения</h3>

            <Input 
                v-model="otpPayload.code"
                class="payment__form-input"
                placeholder="000000"
                :mask="'000000'"
            />


            <!-- <Button
                type="button"
                padding="12px 36px"
                background="#2E4AB5"
                text="Отправить код"
                @click="submitOtp"
            /> -->
        </div>
        <GlobalPreloader v-if="isLoad" />
    </form>
</template>

<script setup lang="ts">

    import { useRouter, useRoute } from "vue-router";

    import { reactive, watch } from "vue";
    import { useCardsApi } from "~/composables/cards/api";

    import Input from '~/shared-ui/ui/Input.vue';
    import Button from "~/shared-ui/ui/Button.vue";
    import GlobalPreloader from '~/features/preloaders/GlobalPreloader.vue';

    const router = useRouter();
    const route = useRoute();

    const isLoad = ref(false);

    const props = defineProps<{
        card: Object
    }>();

    const otpPayload = reactive({
        cardId: '',
        sessionId: '',
        code: ''
    });

    watch(
        () => props.card,
        (card) => {
            if (card) {
                otpPayload.cardId = card.cardId;
                otpPayload.sessionId = card.sessionId;
                otpPayload.code = card.code;
            }
        },
        { immediate: true }
    );



    const emit = defineEmits(["success", "error"]);

    const cardApi = useCardsApi();

    watch(
        () => otpPayload.code,
        async (val) => {
            if (val.length === 6) {
                await submitOtp();
            }
        }
    );

    const submitOtp = async () => {
        try {
            isLoad.value = true;

            const result = await cardApi.confirmCards({
                code: otpPayload.code,
                sessionId: otpPayload.sessionId,
                cardId: otpPayload.cardId
            });

            if (result) {
                isLoad.value = false;
                location.reload();
            }
        }
        catch (err) {
            isLoad.value = false;
            emit("error", err);
        }
    };

</script>
