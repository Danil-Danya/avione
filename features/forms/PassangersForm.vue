<template>
    <form class="passangers__form">
        <div class="passangers__alert-container">
            <h3 class="passangers__alert">
                {{ $t('passengerNumber') }} {{ index }}
            </h3>

            <span class="passangers__alert-span">
                {{ passengerMeta.title }}, {{ passengerMeta.age }}
            </span>
        </div>
        
        <div class="passangers__form-top">
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('savedPassenger') }} </h3>
                <select
                    class="input"
                    v-model="selectedPassengerId"
                >
                    <option :value="null">{{ $t('selectPassenger') }}</option>

                    <option
                        v-for="p in savedPassengers"
                        :key="p.id"
                        :value="p.id"
                    >
                        {{ p.firstName }} {{ p.lastName }}
                    </option>
                </select>
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('lastName') }}</h3>
                <Input 
                    type="text" 
                    :placeholder="$t('lastNamePlaceholder')" 
                    width="250px" v-model="passenger.lastName" 
                    @beforeinput="onBeforeInput"
                    @input="emit('update:modelValue', $event.target.value)"/>
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('firstName') }}</h3>
                <Input 
                    type="text" 
                    :placeholder="$t('firstNamePlaceholder')" 
                    width="250px" 
                    v-model="passenger.firstName" 
                    @beforeinput="onBeforeInput"
                    @input="emit('update:modelValue', $event.target.value)"
                />
            </div>
            <div class="passangers__form-input-container">
                <h3 class="input__title">{{ $t('birthDate') }}</h3>
                <Input type="text" :placeholder="$t('birthDatePlaceholder')" width="250px" v-model="passenger.birthDate" :mask="'00.00.0000'" />
            </div>
        </div>
        <div class="passangers__form-bottom">
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
        </div>
    </form>
</template>

<script setup lang="ts">

    import { useRoute } from 'vue-router';
    import { formatDateToISO } from '~/utils/formatDate';
    import { useCountriesStore } from '~/entities/countries/models/store';
    import countries from '~/helpers/countries';

    import IMask from 'imask';

    import Input from '~/shared-ui/ui/Input.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const emit = defineEmits(['update']);

    const countriesStore = useCountriesStore();

    await countriesStore.fetchCountries();

    const route = useRoute();
    const path = route.path;

    type PassengerType = 'adult' | 'child' | 'infant';

    const props = defineProps<{
        index: number;
        passengerType: PassengerType;
        savedPassengers: any[];
    }>();

    const selectedPassengerId = ref<number | null>(null);


    const passenger = reactive({
        firstName: ''.toUpperCase(),
        lastName: ''.toUpperCase(),
        middleName: '',
        birthDate: '',
        //citizenship: null as any,
        documentExpireDate: '',
        documentNumber: '',
        documentType: 'PSP',
        citizenshipId: null,
        gender: 1
    });

    const submit = () => {
        emit('submit', passenger);
    };

    const onBeforeInput = (e: InputEvent) => {
        if (/[а-яА-ЯёЁ]/.test(e.data ?? '')) {
            e.preventDefault();
        }
    };

    const passengerMeta = computed(() => {
        if (props.passengerType === 'adult') {
            return {
                title: t('passengerAdult'),
                age: t('passengerAdultAge')
            };
        }

        if (props.passengerType === 'child') {
            return {
                title: t('passengerChild'),
                age: t('passengerChildAge')
            };
        }

        return {
            title: t('passengerInfant'),
            age: t('passengerInfantAge')
        };
    });


    watch(
        passenger,
        () => {
            emit('update', {
                ...passenger,
                citizenship: null,
                citizenshipId: passenger.citizenship?.id ?? null,
                birthDate: formatDateToISO(passenger.birthDate),
                documentExpireDate: formatDateToISO(passenger.documentExpireDate)
            });
        },
        { deep: true }
    );



    watch(() => passenger.firstName, val => {
        passenger.firstName = val.toUpperCase();
    });

    watch(() => passenger.lastName, val => {
        passenger.lastName = val.toUpperCase();
    });

    watch(selectedPassengerId, (id) => {
        if (!id) return;

        const saved = props.savedPassengers.find(p => p.id === id);
        if (!saved) return;

        passenger.firstName = saved.firstName;
        passenger.lastName = saved.lastName;
        passenger.birthDate = formatDateFromISO(saved.birthDate);
        passenger.documentNumber = saved.documentNumber;
        passenger.documentExpireDate = formatDateFromISO(saved.documentExpireDate);
        passenger.documentType = saved.documentType;
        passenger.gender = saved.gender;

        const citizenship =
            saved.citizenshipNew ||
            saved.country ||
            null;

        passenger.citizenship = citizenship
            ? countriesStore.countries.find(c => c.id === citizenship.id) ?? null
            : null;
    });

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



</script>