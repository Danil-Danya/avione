<template>
    <section class="payment">
        <div :class="{
            'container': route.path === '/reservation'
        }">
            <div class="payment__content">
                <div class="payment__top">
                    <div class="payment__top-left">
                        <h2 class="title payment__title">{{ $t('paymentTitle') }}</h2>
                    </div>
                    <!-- <div class="payment__top-right">
                        <span class="payment__balance">
                            <BalanceIcon />
                            <p class="text">Баланс</p>
                        </span>
                        <span class="payment__balance">
                            <p class="text">10.000.000.000 сум</p>
                            <Button text="+" padding="5px 10px" background="#2E4AB5" />
                        </span>
                    </div> -->
                </div>
                <div class="payment__bottom">
                    <div class="payment__bottom-radio">
                        <Radio
                            :label="$t('paymentMethodManual')"
                            value="card"
                            v-model="paymentMethod"
                        />
                        <Radio
                            :label="$t('paymentMethodSaved')"
                            value="saved"
                            v-model="paymentMethod"
                        />
                    </div>
                    <div class="payment__bottom-card">
                        <PaymentTab/>
                        <PaymentFormSelect v-if="paymentMethod === 'saved'" @update:cardData="cardData = $event"/>
                        <PaymentForm class="payment__form-ticket" @update:cardData="cardData = $event" v-if="paymentMethod === 'card'" />
                        <div class="payment__info">
                            <h3 class="title payment__info-price">
                                {{ $t('paymentPrice') }}: {{ formattedPrice }}
                            </h3>
                            <div class="payment__info-button">
                                <!-- <Button background="#EE2532" padding="10px 60px" text="Отменить" /> -->
                                <Button class="payment__button" background="#2E4AB5" padding="10px 60px" :text="$t('paymentBuyButton')" @click="submitPayment" />
                            </div>
                            <GlobalPreloader type="payment" v-if="isLoad" />
                            <p class="payment__message">{{ message }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <OTPModal v-if="isOpenOtpModal" :payment-id="payedTicket?.payload?.id" />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { Ref, ref, defineAsyncComponent, computed, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import { useTicketsApi } from '~/composables/tickets/lib/useApi';

    import Button from '~/shared-ui/ui/Button.vue';
    import Radio from '~/shared-ui/ui/Radio.vue';
    import PaymentTab from '~/features/tabs/PaymentTab.vue';
    import PaymentForm from '~/features/forms/PaymentForm.vue';
    import PaymentFormSelect from '~/features/forms/PaymentFormSelect.vue';
    import GlobalPreloader from '~/features/preloaders/GlobalPreloader.vue';

    import OTPModal from '~/features/modals/OTPModal.vue';

    type PaymentMethod = 'card' | 'saved';

    const paymentMethod = ref<PaymentMethod>('card');
    const isLoad = ref(false);

    const payedTicket = ref<any>(null);

    const route = useRoute();
    const router = useRouter();
    const ticketApi = useTicketsApi();

    const isOpenOtpModal = ref(false);

    const message = ref('');

    watch(
        () => payedTicket.value,
        (val) => {
            if (val?.payload?.id) {
                isOpenOtpModal.value = true;
            }
        }
    );

    type CardData =
        | {
            type: 'card';
            pan: string;
            expireDate: string;
            saveCard: boolean;
        }
        | {
            type: 'saved';
            cardId: number;
        };

    const cardData = ref<CardData | null>(null);

    const ticket: Ref<any | null> = ref(null);

    const getTicketFromSession = () => {
        const path = route.path;

        let raw: string | null = null;

        if (path.startsWith('/profile/order')) {
            raw = sessionStorage.getItem('order');
        }
        else if (path.startsWith('/reservation')) {
            raw = sessionStorage.getItem('selected_ticket');
        }

        if (!raw) {
            return null;
        }

        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    };


    const formattedPrice = computed(() => {
        if (!ticket.value || !ticket.value.price) {
            return '—';
        }

        const price = Number(ticket.value.price);

        if (Number.isNaN(price)) {
            return '—';
        }

        return `${price.toLocaleString('ru-RU')} сум`;
    });

    const getTicketId = () => {
        if (route.query.reservation_id) {
            return route.query.reservation_id;
        }

        if (ticket.value?.id) {
            return ticket.value.id;
        }

        return null;
    };


    const submitPayment = async () => {
        isLoad.value = true;
        message.value = '';

        const ticketId = getTicketId();

        if (!ticketId) {
            message.value = 'Бронь не найдена';
            return;
        }

        if (!cardData.value) {
            message.value = 'Выберите способ оплаты';
            return;
        }

        let payload: any = {
            ticketId
        };

        if (cardData.value.type === 'saved') {
            payload.cardId = cardData.value.cardId;
        }
        else {
            if (!cardData.value.pan || !cardData.value.expireDate) {
                message.value = 'Введите данные карты';
                return;
            }

            payload.card = {
                pan: cardData.value.pan.replace(/\s+/g, ''),
                expireDate: cardData.value.expireDate.replace('/', ''),
                saveCard: cardData.value.saveCard
            };
        }

        payedTicket.value = await ticketApi.paymentTicket(payload);

        if (payedTicket.value?.payload?.paymentId) {
            isLoad.value = false;
            isOpenOtpModal.value = true;

            router.replace({
                query: {
                    ...route.query,
                    payment_id: payedTicket.value.payload.paymentId
                }
            });
        }
        else {
            isLoad.value = false;
            message.value = payedTicket.value.error?.message;
        }
    };


    watch(
        () => paymentMethod.value,
        () => {
            cardData.value = null;
            message.value = null;
        }
    );



    const BalanceIcon = defineAsyncComponent(() => import('~/shared-ui/icons/payment/Balance.vue'));

    const isBalanceRadioActive: Ref<boolean> = ref(false);
    const isCardRadioActive: Ref<boolean> = ref(false);

    onMounted(() => {
        ticket.value = getTicketFromSession();
    });
</script>


<style lang="scss">
    @import '~/assets/styles/shared/pages/payment.scss';
</style>