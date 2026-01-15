<template>
    <div class="registration__modal modal">
        <div class="modal__wrapper registration__modal-wrapper">
            <span class="modal__close">
                <CloseIcon @click="onCloseModal" />
            </span>

            <div
                class="tariff__modal-content"
                v-if="compiledTariffsInfo && !error"
                v-html="compiledTariffsInfo"
            ></div>

            <p class="tariff__error" v-else-if="error">
                {{ error }}
            </p>

            <GlobalPreloader type="tariff" v-else />
        </div>
    </div>
</template>

<script setup lang="ts">

    import { useTicketStore } from '~/entities/tickets/models/store';
    import { useRoute } from 'vue-router';
    import { marked } from 'marked';
    import GlobalPreloader from '../preloaders/GlobalPreloader.vue';

    const CloseIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/Close.vue')); 

    const emits = defineEmits(['closeModal']);

    const ticketStore = useTicketStore();
    const route = useRoute();

    const error = ref<string | null>(null);
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const compiledTariffsInfo = computed(() => {
        if (!ticketStore.tariffsInfo) {
            return null;
        }

        return marked(ticketStore.tariffsInfo);
    });

    const onCloseModal = () => {
        emits('closeModal');
    };

    onMounted(async () => {
        timeoutId = setTimeout(() => {
            error.value = 'Внутренняя ошибка сервера или билет больше не актуален';
        }, 20000);

        try {
            await ticketStore.fetchTariffsInfo(route.query.tariff_id);

            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }
        catch (e) {
            error.value = 'Внутренняя ошибка сервера или билет больше не актуален';
        }
    });

    onUnmounted(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        ticketStore.tariffsInfo = null;
        error.value = null;
    });

</script>

<style lang="scss">
    @import '~/assets/styles/features/modals/registration.scss';
</style>
