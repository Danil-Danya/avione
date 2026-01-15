<template>
    <div class="passangers">
        <div class="container">
            <div class="passangers__content" v-if="ticket">
                <h2 class="passangers__title title">{{ $t('passengersTitle') }}</h2>
                <p class="passangers__text text">{{ $t('passengersDescription') }}</p>
               <PassangersForm
                    v-for="passenger in passengers"
                    :key="passenger.index"
                    :index="passenger.index"
                    :passenger-type="passenger.type"
                    :saved-passengers="passengersStore.passengers"
                    @update="data => onPassengerUpdate(data, passenger.index)"
                />

                <div class="passangers__info" v-if="cleanPath === '/reservation'">
                    <div class="passangers__price-container">
                        <p class="passangers__price">{{ $t('price') }}</p>
                        <p class="passangers__price">{{ formatNumber(ticket.price) }} {{ $t('valute') }}</p>   
                    </div>
                    <div class="passangers__button-container" v-if="!isReservated">
                        <Button 
                            class="passangers__button"
                            background="#2E4AB5" 
                            :text="$t('bookButton')"
                            padding="10px 30px"
                            @click="bookTicket"
                        />
                    </div>
                    <GlobalPreloader type="booking" v-if="isLoad" />
                    <p class="passangers__message" v-if="!isReservated && !isLoad">
                        <span v-if="$i18n.locale === 'ru'">
                            Нажимая кнопку <span class="highlight">«Забронировать билет»</span>, вы принимаете
                            <span class="highlight pointer" @click="openTariffModal">правила тарифа </span> и <span class="highlight pointer" @click="openTariffModal">оферту</span>
                        </span>
                        <span v-else-if="$i18n.locale === 'uz'">
                            «<span class="highlight">Chiptani sotib olish</span>» tugmasini bosganingizda, siz 
                            <span class="highlight pointer" @click="openTariffModal">tarif qoidalari</span> va <span class="highlight pointer" @click="openTariffModal">taklifni</span> taklifni qabul qilgan bo‘lasiz
                        </span>
                    </p>
                    <p class="passangers__button-message" :class="'passangers__button-message-' + message.type" v-if="!isReservated">{{ message.text }}</p>
                </div>
            </div>
        </div>
        <TariffModal 
            v-if="isTariffModalOpen"
            @closeModal="closeTariffModal"
        />
    </div>
</template>

<script setup lang="ts">

    import PassangersForm from '~/features/forms/PassangersForm.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    import TariffModal from '~/features/modals/TariffModal.vue';

    import { useTicketsApi } from '~/composables/tickets/lib/useApi';
    import { usePassengerStore } from '~/entities/passengers/models/store';
    import { formatNumber } from '~/utils/formatNumber';
    import { useRouter, useRoute } from 'vue-router';
    import GlobalPreloader from '~/features/preloaders/GlobalPreloader.vue';

    const ticketApi = useTicketsApi();
    const router = useRouter();
    const passengersStore = usePassengerStore();

    const isTariffModalOpen = ref(false);

    const openTariffModal = () => {
        isTariffModalOpen.value = true;
    };

    const closeTariffModal = () => {
        isTariffModalOpen.value = false;
    };


    const route = useRoute();

    const path = route.path;
    const isLoad = ref(false);

    const message = reactive({
        text: '',
        type: ''
    })

    await passengersStore.fetchPassengers();

    type PassengerType = 'adult' | 'child' | 'infant';

    interface PassengerSlot {
        index: number;
        type: PassengerType;
    }


    const passengers = computed<PassengerSlot[]>(() => {
        const adult = Number(route.query?.adult_count || 0);
        const child = Number(route.query?.child_count || 0);
        const infant = Number(route.query?.infant_count || 0);

        const list: PassengerSlot[] = [];
        let index = 1;

        for (let i = 0; i < adult; i++) {
            list.push({ index, type: 'adult' });
            index++;
        }

        for (let i = 0; i < child; i++) {
            list.push({ index, type: 'child' });
            index++;
        }

        for (let i = 0; i < infant; i++) {
            list.push({ index, type: 'infant' });
            index++;
        }

        return list;
    });

    const passengerData = ref<any[]>([]);

    const onPassengerUpdate = (data, index) => {
        passengerData.value[index - 1] = {
            ...data
        };
    };


    const ticket = ref(null);

    const loadTicket = () => {
        const raw = sessionStorage.getItem('selected_ticket');
        ticket.value = raw ? JSON.parse(raw) : null;
    };

    onMounted(() => {
        loadTicket();
        window.addEventListener('ticket-updated', loadTicket);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('ticket-updated', loadTicket);
    });

    const cleanPath = computed(() => {
        return route.path.replace(/^\/(ru|uz)/, '') || '/';
    });

    const isReservated = ref(false);

    const bookTicket = async () => {
        try {
            isLoad.value = true;
            const tariffId = route.query.tariff_id;

            const payload = {
                ids: [tariffId],
                pccId: route.query.pcc,
                passengerIds: [],
                passengers: passengerData.value
            };

            const res = await ticketApi.bookTicket(payload);
            
            if (res) {
                const cityFrom = res.payload.data[0].segments[0].departureCity.name;
                const cityTo = res.payload.data[0].segments[0].arrivalCity.name;

                isLoad.value = false;
                isReservated.value = true;
                message.text = `Билет ${cityFrom} - ${cityTo} был успешно зарезервирован`;
                message.type = 'success' 

                router.push({
                    query: {
                        ...route.query,
                        reservation_id: res.payload.data[0].id
                    }
                })
            }
            else {
                isLoad.value = false;
                message.text = `Ошибка брони билета`;
                message.type = 'error'
            }
        }
        catch (err) {
            console.log(err);
        }
    };


</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/passangers.scss';
</style>