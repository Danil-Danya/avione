<template>
    <section class="tariffs">
        <div class="container">
            <div class="tariffs__content">
                <h2 class="tariffs__title title">{{ $t('tariffsTitle') }}</h2>
                <div class="tariffs__container">
                    <TariffsCard v-if="ticketStore.tariffs.length"
                        v-for="(value, index) in ticketStore.tariffs"
                        :class="{ active: activeIndex === index }"
                        @click="setActive(index)"
                        :key="value.id"
                        :tariff="value"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import TariffsCard from '~/widgets/TariffsCard.vue';
    import { useTicketStore } from '~/entities/tickets/models/store';
    import { useRoute, useRouter } from 'vue-router';

    const ticketStore = useTicketStore();

    const route = useRoute();
    const router = useRouter();

    const activeIndex = ref<number | null>(null);

    watch(
        () => ticketStore.tariffs,
        (tariffs) => {
            if (!tariffs.length) {
                return;
            }

            if (route.query.tariff_id) {
                const index = tariffs.findIndex(t => t.id === route.query.tariff_id);

                if (index !== -1) {
                    activeIndex.value = index;
                    return;
                }
            }

            activeIndex.value = 0;
            router.replace({
                query: {
                    ...route.query,
                    tariff_id: tariffs[0].id
                }
            });
        },
        { immediate: true }
    );

    function updateSelectedTicketPrice(newPrice: number) {
        const stored = sessionStorage.getItem("selected_ticket");

        if (!stored) {
            return;
        }

        const ticket = JSON.parse(stored);
        ticket.price = newPrice;

        sessionStorage.setItem("selected_ticket", JSON.stringify(ticket));
    }

    const setActive = (index: number) => {
        activeIndex.value = index;

        const selectedTariff = ticketStore.tariffs[index];

        updateSelectedTicketPrice(selectedTariff.price);

        router.replace({
            query: {
                ...route.query,
                tariff_id: selectedTariff.id
            }
        });

        window.dispatchEvent(new Event("ticket-updated"));
    };

</script>



<style lang="scss">
    @import '~/assets/styles/shared/pages/tariffs.scss';
</style>