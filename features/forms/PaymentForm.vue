<template>
    <form class="payment__form">
        <div class="payment__form-input-container">
            <h3 class="payment__form-title">{{ $t('paymentCardNumber') }}</h3>

            <Input 
                v-model="cardPayload.pan"
                class="payment__form-input"
                placeholder="0000 0000 0000 0000"
                :mask="'0000 0000 0000 0000'"
            />
        </div>

        <div class="payment__form-input-container">
            <h3 class="payment__form-title">{{ $t('paymentExpireDate') }}</h3>

            <Input 
                v-model="cardPayload.expireDate"
                class="payment__form-input"
                placeholder="MM/YY"
                :mask="mmMask"
            />
        </div>

        <div class="payment__form-input-container-check">
            <Checkbox v-model="cardPayload.saveCard" />

            <h3 class="payment__form-title payment__form-title-check">{{ $t('paymentSaveCard') }}</h3>
        </div>
    </form>
</template>

<script setup lang="ts">

    import { reactive, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import IMask from "imask";
    import Input from '~/shared-ui/ui/Input.vue';
    import Checkbox from "~/shared-ui/ui/Checkbox.vue";

    const route = useRoute();

    const cardPayload = reactive({
        pan: "",
        expireDate: "",
        saveCard: false,
    });

    const mmMask = {
        mask: "MM/YY",
        blocks: {
            MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2
            },
            YY: {
                mask: "00"
            }
        }
    };

    const emit = defineEmits(["update:cardData"]);


    watch(
        () => ({ ...cardPayload }),
        (val) => {
            emit('update:cardData', {
                type: 'card',
                ...val
            });
        },
        { deep: true }
    );

</script>
