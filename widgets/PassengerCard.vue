<template>
    <div class="passenger__card" v-if="passengerCardData">
        <div class="passenger__card-top">
            <h3 class="title passenger__card-title">{{ passengerCardData.name }}</h3>
            <div class="passenger__card-buttons">
                <DeleteButton  @click="toggleDeleteModal" v-if="!isOrder" />
                <Button :text="$t('passengerCardEdit')" background="#CCCCCC" padding="10px" @click="togglePassengerModal" v-if="!isOrder" />
            </div>
        </div>
        <div class="passenger__card-bottom">
            <div class="passenger__card-grid">
                <div 
                    class="passenger__card-item" 
                    v-for="(item, index) in passengerCardData.fields" 
                    :key="index"
                >
                    <p class="passenger__card-label">{{ $t(item.label) }}</p>
                    <p class="passenger__card-value">{{ item.value }}</p>
                </div>
            </div>
        </div>
        <DeleteModal 
            v-if="isOpenDeleteModal"
            :entity-name="$t('passengerCardDeleteEntity')"
            :entity-title="`${$t('passengerCardDeleteEntityTitle', { name: passengerCardData.name })}`"
            @confirm="confirmDelete"
            @cancel="toggleDeleteModal"
        />
        <PassangerModal
            v-if="isOpenPassengerModal"
            @close="togglePassengerModal"
            :is-edit="true"
            :entity-name="`${$t('passengerCardDeleteEntityTitle', { name: passengerCardData.name })}`"
            :passenger="passenger"
        />
    </div>    
</template>


<script setup lang="ts">

    import { usePassengersApi } from '~/composables/passengers/lib/api';
    import { usePassengerStore } from '~/entities/passengers/models/store';
    import { formatDateFromISO } from '~/utils/formatDateFromISO';

    import { useI18n } from 'vue-i18n';

    
    import Button from '~/shared-ui/ui/Button.vue';
    import DeleteButton from '~/shared-ui/ui/DeleteButton.vue';
    
    import DeleteModal from '~/features/modals/DeleteModal.vue';
    import PassangerModal from '~/features/modals/PassangerModal.vue';
    
    const { t } = useI18n();
    const isOpenDeleteModal = ref(false);
    const isOpenPassengerModal = ref(false);

    const passengerStore = usePassengerStore();
    
    const toggleDeleteModal = () => {
        isOpenDeleteModal.value = !isOpenDeleteModal.value;
    }

    const togglePassengerModal = () => {
        isOpenPassengerModal.value = !isOpenPassengerModal.value;
    }

    const props = defineProps<{
        passenger: object,
        isOrder: boolean
    }>();

    const confirmDelete = async () => {
        const { deletePassenger } = usePassengersApi()

        await deletePassenger(props.passenger.id);
        await passengerStore.fetchPassengers();

        isOpenDeleteModal.value = false;
    };

    const passengerCardData = ref({
        name: `${props.passenger?.firstName} ${props.passenger?.lastName}`,
        fields: [
            { label: 'passengerCardBirthDate', value: formatDateFromISO(props.passenger.birthDate) },
            { label: 'passengerCardDocumentType', value: props.passenger.documentType === 'PSP' ? t('passengerCardPassport') : t('passengerCardUnknownDocument') },
            { label: 'passengerCardDocumentIssueDate', value: formatDateFromISO(props.passenger.documentExpireDate) },
            { label: 'passengerCardGender', value: props.passenger.gender === 1 ? t('passengerCardMale') : t('passengerCardFemale') },
            { label: 'passengerCardDocumentNumber', value: props.passenger.documentNumber },
            { label: 'passengerCardGender', value: props.passenger.country.name },
        ]
    });


</script>

<style lang="scss">
    @import '~/assets/styles/widgets/passenger-card.scss';
</style>