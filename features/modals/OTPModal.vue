<template>
    <div class="registration__modal modal">
        <div class="modal__wrapper registration__modal-wrapper">

            <div class="registration__modal-content otp-modal-content">
                <OtpForm v-model:otp="otp" :payment-id="paymentId" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { defineAsyncComponent } from 'vue';

    import OtpForm from '../forms/OTPForm.vue';

    const props = defineProps<{
        paymentId: string | number;
    }>();

    watch(
        () => props.paymentId,
        (newVal, oldVal) => {},
        { immediate: true }
    );


    const CloseIcon = defineAsyncComponent(() =>
        import('~/shared-ui/icons/global/Close.vue')
    );

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
