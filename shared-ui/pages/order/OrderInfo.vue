<template>
    <section class="order">
        <div class="order__content">
            <h2 class="order__title">
                {{ $t(ticketStatusText) }}
                <span v-if="showTimer && ticket.status === 0" class="order__timer">{{ timeLeft }}</span>
            </h2>
            <div class="order__item-container">
                <div class="order__item" v-for="item in ticketData" :key="item.title">
                    <p class="order__title-mini text">{{ item.title }}</p>
                    <h2 class="order__value">{{ item.value }}</h2>
                </div>
            </div>
            <div class="order__bottom" v-if="ticket.status === 1">
                <Button
                    class="order__button"
                    @click="downloadTicket"
                    padding="12px 36px"
                    background="#2E4AB5"
                    :text="$t('downloadTicket')"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Button from '~/shared-ui/ui/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const ticket = JSON.parse(sessionStorage.getItem('order') || '{}');

const ticketStatusMap: Record<number, string> = {
    0: 'ticketStatusBooked',   
    1: 'ticketStatusIssued',   
    2: 'ticketStatusCanceled'  
};

const ticketStatusText = computed(() => {
    return ticketStatusMap[ticket.status] || 'Неизвестный статус';
});

const downloadTicket = () => {
    const link = `https://new-api.avione.uz/api/air/ticket/download-ticket?id=${ticket.id}`;
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.click();
};

const timeLeftMs = ref(0);
let timer: number;

const updateTimeLeft = () => {
    const now = new Date().getTime();
    const created = new Date(ticket.createdDate).getTime();
    const maxDuration = 10 * 60 * 1000;
    const endTime = created + maxDuration;

    let diff = endTime - now;
    if (diff <= 0) {
        diff = 0;
        clearInterval(timer);
    }

    timeLeftMs.value = diff;
};

onMounted(() => {
    if (ticket.status === 0) {
        updateTimeLeft();
        timer = setInterval(updateTimeLeft, 1000);
    }
});

onUnmounted(() => {
    clearInterval(timer);
});

const timeLeft = computed(() => {
    if (timeLeftMs.value <= 0) {
        return t('ticketTimeExpired');
    }
    const minutes = Math.floor(timeLeftMs.value / 1000 / 60);
    const seconds = Math.floor((timeLeftMs.value / 1000) % 60);
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
});

const showTimer = computed(() => ticket.status === 0 || timeLeftMs.value <= 0);

const ticketData = computed(() => {
    const data = [
        {
            title: t('ticketPNR'),
            value: ticket.pnrNumber
        },
        {
            title: t('ticketOrderNumber'),
            value: ticket.orderId
        }
    ];

    if (ticket.status === 0 || timeLeftMs.value <= 0) {
        // data.push({
        //     title: t('ticketTimeLeft'),
        //     value: timeLeft.value
        // });
    }

    data.push({
        title: t('ticketPaymentAmount'),
        value: `${formatNumber(ticket.price)} ${t('valute')}`
    });

    return data;
});
</script>

<style lang="scss">
@import '@/assets/styles/shared/pages/order.scss';

.order__timer {
    font-weight: normal;
    font-size: 1rem;
    margin-left: 10px;
    color: #ff4d4f;
    font-weight: 700;
}
</style>
