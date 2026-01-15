<template>
    <section class="ticket__tab">
        <div class="container">
            <div class="ticket__tab-content">
                <ul class="ticket__tab-list">
                    <li
                        class="ticket__tab-li"
                        v-for="link in ticketTabLinks"
                        :key="link.key"
                    >
                        <span
                            class="ticket__tab-link"
                            :class="{
                                'ticket__tab-link--active':
                                    (!hasReservationId && link.key === 'reservation') ||
                                    (hasReservationId && link.key === 'payment')
                            }"
                        >
                            {{ link.text }}
                        </span>
                    </li>
                </ul>
                <Button 
                    text="<"
                    background="#2E4AB5"
                    padding="15px 30px"
                    @click="goToBack"
                    v-if="!isMobile"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, Ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import { useRouter } from 'vue-router';
    import { useIsMobile } from '~/composables/useIsMobile';

    import Button from '~/shared-ui/ui/Button.vue';

    const isMobile = useIsMobile();

    const route = useRoute();
    const router = useRouter();

    const goToBack = () => {
        router.go(-1);
    }

    const { locale, t } = useI18n();

    const ticketTabLinks = computed(() => [
        { text: t('ticketTabReservation'), key: 'reservation' },
        { text: t('ticketTabPayment'), key: 'payment' },
        { text: t('ticketTabTicket'), key: 'ticket' }
    ]);



    const hasReservationId = computed(() => Boolean(route.query.reservation_id));
</script>



<style lang="scss">
    @import '~/assets/styles/features/tab/ticket-tab.scss';
</style>