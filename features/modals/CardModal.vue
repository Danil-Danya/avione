<template>
    <div class="registration__modal modal">
        <div class="modal__wrapper registration__modal-wrapper">

            <div class="registration__modal-content otp-modal-content">
                <CardOTPForm 
                    v-model:otp="otp" 
                    :card="{
                        cardId,
                        sessionId,
                        code
                    }" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { defineAsyncComponent } from 'vue';

    import CardOTPForm from '../forms/CardOTPForm.vue';

    const props = defineProps<{
        cardId: string | number;
        sessionId: string;
        code: number
    }>();

    const emits = defineEmits(['closeModal', 'submitOtp']);

    const otp = ref("");

    watch(otp, (val) => {
        if (val.length === 6) {
            emits('submitOtp', val);
        }
    });

    const onCloseModal = () => {
        emits('closeModal');
    };



</script>

<style lang="scss">
    @import '~/assets/styles/features/modals/registration.scss';

</style>
