<template>
    <section class="booking__modal">
        <div class="booking__modal-overlay" @click="close" />

        <div class="booking__modal-content passenger">
            <div class="booking__modal-header">
                <h2 class="booking__modal-title">
                    {{ isEdit ? 'Изменить' : 'Создать' }} {{ entityName }}
                </h2>
            </div>

            <div class="booking__modal-body">
                <PassangerProfileModal
                    :passenger-data="passenger"
                    @update="onPassengerUpdate"
                />
            </div>

            <div class="booking__modal-actions">
                <Button
                    padding="12px 36px"
                    background="#2E4AB5"
                    :text="$t('save')"
                    @click="updatePassenger"
                />
                <Button
                    padding="12px 36px"
                    background="#EE2532"
                    :text="$t('close')"
                    @click="close"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { defineProps, defineEmits } from 'vue';
    import { usePassengersApi } from '~/composables/passengers/lib/api';
    import { usePassengerStore } from '~/entities/passengers/models/store';

    import Button from '~/shared-ui/ui/Button.vue';

    import PassangerProfileModal from '../forms/PassangerProfileModal.vue';

    const passengerStore = usePassengerStore();

    const props = defineProps<{
        entityName: string;  
        isEdit?: boolean;    
        passenger: object;
    }>();

    const passengersApi = usePassengersApi();
    const endPassenger = reactive<any>({});
    
    const onPassengerUpdate = (data: any) => {
        console.log(data);
        
        Object.assign(endPassenger, data);
    };

    const updatePassenger = async () => {
        const savedPassenger = await props.isEdit ? passengersApi.updatePassenger(endPassenger) : passengersApi.createPassenger(endPassenger);
        if (savedPassenger) {
            await passengerStore.fetchPassengers();
            close();
        }
    }


    const emits = defineEmits<{
        (e: 'close'): void;
        (e: 'save'): void;
    }>();

    const close = () => {
        emits('close');
    };

    const save = () => {
        emits('save');
    };

</script>
