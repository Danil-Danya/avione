<template>
    <form  class="passangers__form">
        <div class="passangers__form-top">
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('lastName') }}</h3>
                <Input 
                    type="text" 
                    :placeholder="$t('lastNamePlaceholder')" 
                    width="250px" v-model="passenger.lastName" 
                    @beforeinput="onBeforeInput" 
                />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('firstName') }}</h3>
                <Input 
                    type="text" 
                    :placeholder="$t('firstNamePlaceholder')" 
                    width="250px" 
                    v-model="passenger.firstName" 
                    @beforeinput="onBeforeInput"
                />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('birthDate') }}</h3>
                <Input type="text"  :placeholder="$t('birthDatePlaceholder')" width="250px" v-model="passenger.birthDate" :mask="'00.00.0000'" />
            </div>
        </div>
        <div class="passangers__form-bottom passangers__form-bottom-modal">
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('citizenship') }}</h3>
                <select
                    class="input passangers__form-input-select"
                    v-model="passenger.citizenship"
                >
                    <option
                        v-for="c in countriesStore.countries"
                        :key="c.id"
                        :value="c"
                    >
                        {{ c.name }}
                    </option>
                </select>
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('documentNumber') }}</h3>
                <Input type="text" :placeholder="$t('documentNumberPlaceholder')" width="250px" v-model="passenger.documentNumber" />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('documentExpireDate') }}</h3>
                <Input type="text" :placeholder="$t('documentExpireDatePlaceholder')" width="250px" v-model="passenger.documentExpireDate" :mask="'00.00.0000'" />
            </div>
            <div class="passangers__form-switcher-container">
                <h3 class="input__title">{{ $t('gender') }}</h3>
                <div class="passangers__switcher">
                    <Button 
                        :text="$t('genderMale')" 
                        :background="passenger.gender === 1 ? '#2E4AB5' : '#EFF1F4'" 
                        padding="5px 15px"
                        :class="passenger.gender === 1 ? 'white' : 'black'"
                        @click.prevent.stop="passenger.gender = 1"
                    />

                    <Button 
                        :text="$t('genderFemale')" 
                        :background="passenger.gender === 0 ? '#2E4AB5' : '#EFF1F4'" 
                        padding="5px 15px"
                        :class="passenger.gender === 0 ? 'white' : 'black'"
                        @click.prevent.stop="passenger.gender = 0"
                    />


                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">

    import { formatDateToISO } from '~/utils/formatDate';
    import { formatDateFromISO } from '~/utils/formatDateFromISO';
    import { useCountriesStore } from '~/entities/countries/models/store';
    import { useUserStore } from '~/entities/users/models/store';

    import Input from '~/shared-ui/ui/Input.vue';
    import Button from '~/shared-ui/ui/Button.vue';
    import countries from '~/helpers/countries';

    const props = defineProps<{
        isUpdate: boolean,
        passengerData: object
    }>();

    const countriesStore = useCountriesStore();
    const userStore = useUserStore();

    await countriesStore.fetchCountries();
    await userStore.fetchProfile();


    const passenger = reactive({
        firstName: ''.toUpperCase(),
        lastName: ''.toUpperCase(),
        middleName: '',
        birthDate: '',
        citizenship: null,
        documentExpireDate: '',
        documentNumber: '',
        documentType: 'PSP',
        gender: 1,
        citizenshipId: null,
        phoneCode: '+998',
        phoneNumber: userStore.profile.phone,
        id: ''
    });

    const onBeforeInput = (e: InputEvent) => {
        if (/[а-яА-ЯёЁ]/.test(e.data ?? '')) {
            e.preventDefault();
        }
    };
    

    watch(
        [() => props.passengerData, () => countriesStore.countries],
        ([newData, countries]) => {
            if (!newData || !countries.length) return;

            Object.assign(passenger, {
                firstName: newData.firstName ?? '',
                lastName: newData.lastName ?? '',
                middleName: newData.middleName ?? '',
                birthDate: formatDateFromISO(newData.birthDate),
                documentExpireDate: formatDateFromISO(newData.documentExpireDate),
                documentNumber: newData.documentNumber,
                documentType: newData.documentType,
                gender: newData.gender,
                id: newData.id,
                phoneCode: passenger.phoneCode
            });

            const citizenshipSource =
                newData.citizenshipNew ||
                newData.country ||
                null;

            passenger.citizenship = citizenshipSource
                ? countries.find(c => c.id === citizenshipSource.id) ?? null
                : null;
        },
        { immediate: true }
    );


    watch(
        passenger,
        () => {
            const { citizenship, ...rest } = passenger;

            emit('update', {
                ...rest,
                citizenshipId: citizenship?.id ?? null,
                birthDate: formatDateToISO(passenger.birthDate),
                documentExpireDate: formatDateToISO(passenger.documentExpireDate)
            });
        },
        { deep: true }
    );


    watch(
        () => countriesStore.countries,
        (countries) => {
            if (!countries.length) return;

            if (!passenger.citizenship) {
                passenger.citizenship =
                    countries.find(c => c.id === 121) || countries[0];
            }
        },
        { immediate: true }
    );


    const emit = defineEmits<{
        (e: 'update', data: any): void;
    }>();

    watch(() => passenger.firstName, val => {
        passenger.firstName = val.toUpperCase();
    });

    watch(() => passenger.lastName, val => {
        passenger.lastName = val.toUpperCase();
    });

</script>

<style lang="scss">
    @import '~/assets/styles/shared/pages/passangers.scss';
</style>