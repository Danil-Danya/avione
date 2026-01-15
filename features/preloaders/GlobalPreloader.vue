<template>
    <div class="preloader">
        <span class="loader"></span>
        <p class="text">{{ $t(preloaderKey) }}</p>
    </div>
</template>

<script setup lang="ts">

    import { computed } from 'vue';

    const props = defineProps<{
        type?: 'booking' | 'payment';
    }>();

    const preloaderKey = computed(() => {
        if (props.type === 'booking') {
            return 'preloaderBooking';
        }

        if (props.type === 'payment') {
            return 'preloaderPayment';
        }

        if (props.type === 'tariff') {
            return 'preloaderTariff';
        }

        return 'preloaderOperation';
    });

</script>
