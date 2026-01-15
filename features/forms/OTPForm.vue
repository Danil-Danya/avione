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


        </div>
        <GlobalPreloader v-if="isLoad" />
    </form>
</template>

<script setup lang="ts">

    import { useRouter, useRoute } from "vue-router";

    import { reactive, watch } from "vue";
    import { useTicketsApi } from "~/composables/tickets/lib/useApi";

    import Input from '~/shared-ui/ui/Input.vue';
    import GlobalPreloader from '~/features/preloaders/GlobalPreloader.vue';

    const router = useRouter();
    const route = useRoute();

    const isLoad = ref(false);

    const props = defineProps<{
        paymentId: string | number;
    }>();

    watch(
        () => props.paymentId,
        (newVal) => {
            console.log("paymentId changed:", newVal);
        }
    );

    const emit = defineEmits(["success", "error"]);

    const ticketApi = useTicketsApi();

    const otpPayload = reactive({
        code: ""
    });

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

            const result = await ticketApi.applyOtpPaymentTicket({
                otp: otpPayload.code,
                paymentId: route.query.payment_id
            });

            if (result) {
                isLoad.value = false;

                router.replace({
                    path: '/profile/orders'
                })
            }
        }
        catch (err) {
            isLoad.value = false;
            emit("error", err);
        }
    };

</script>
