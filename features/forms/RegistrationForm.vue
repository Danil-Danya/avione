<template>
    <form class="registration__form" @submit.prevent="loginSession">
        <h2 class="title registration__form-title">{{ $t('authTitle') }}</h2>

        <div class="registration__form-input-container" v-if="step === 1">
            <label class="registration__form-label">{{ $t('authPhoneLabel') }}</label>
            <input 
                ref="phoneRef"
                type="tel"
                class="registration__form-input"
                placeholder="+998 (90) 990-90-90"
            >
        </div>

        <div class="registration__form-input-container" v-if="step === 2">
            <label class="registration__form-label">{{ $t('authOtpLabel') }}</label>
            <input
                ref="otpRef"
                type="tel"
                class="registration__form-input"
                placeholder="1234"
                v-model="otp"
                autocomplete="one-time-code"
                inputmode="numeric"
                pattern="\d*"
            />

        </div>

        <div class="registration__form-profile-container" v-if="step === 3">

            <div class="registration__form-input-container">
                <label class="registration__form-label">{{ $t('authFirstName') }}</label>
                <input
                    type="text"
                    class="registration__form-input"
                    :placeholder="$t('authFirstNamePlaceholder')"
                    v-model="firstName"
                />
            </div>

            <div class="registration__form-input-container">
                <label class="registration__form-label">{{ $t('authLastName') }}</label>
                <input
                    type="text"
                    class="registration__form-input"
                    :placeholder="$t('authLastNamePlaceholder')"
                    v-model="lastName"
                />
            </div>

        </div>

        <div class="registration__form-checkbox-container">
            <Checkbox v-model="isAllowed" />
            <NuxtLink to="/privacy" class="registration__form-text">
                {{ $t('authAgreement') }}
            </NuxtLink>
        </div>

        <div class="registration__form-button-container">
            <Button 
                :text="$t('authLoginButton')"
                background="#2E4AB5"
                padding="15px 30px"
                class="registration__form-button"
                @click.stop.prevent="loginSession"
            />
        </div>
    </form>
</template>

<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    import { useUserApi } from '~/composables/users/lib/useApi';
    import { useUserStore } from '~/entities/users/models/store';

    import Checkbox from '~/shared-ui/ui/Checkbox.vue';
    import Button from '~/shared-ui/ui/Button.vue';

    const userApi = useUserApi();
    const userStore = useUserStore();
    const router = useRouter();

    const phoneRef = ref<HTMLInputElement | null>(null);
    const otpRef = ref<HTMLInputElement | null>(null);

    const phoneMask = ref<any>(null);
    const otpMask = ref<any>(null);

    const step: Ref<number> = ref(1);

    const phone: Ref<string> = ref('');
    const otp: Ref<string> = ref('');

    const firstName = ref('');
    const lastName = ref('');

    const isAllowed = ref(true);

    const sessionData = reactive({});

    const loginSession = async () => {
        try {
            if (step.value === 1) {
                await loginSessionUser();
            }
            else if (step.value === 2) {
                await verifySessionUser();
            }
            else if (step.value === 3) {
                await createUserProfile();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const loginSessionUser = async () => {
        try {
            const response = await userApi.loginUser({
                phone: phone.value
            });

            if (response) {
                sessionData.sessionId = response.payload.sessionId;
                step.value = 2;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const verifySessionUser = async () => {
        try {
            const response = await userApi.verifyUser({
                sessionId: sessionData.sessionId,
                code: otp.value
            });

            if (response.payload) {
                const payload = response.payload;

                localStorage.setItem('accessToken', payload.accessToken);
                localStorage.setItem('refreshToken', payload.refreshToken);

                if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
                    step.value = 3;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const createUserProfile = async () => {
        try {
            await userStore.fetchProfile();

            if (userStore.profile.firstName && userStore.profile.lastName) {
                location.reload();
            }

            const updatedUser = await userApi.updateUser({
                firstName: firstName.value,
                lastName: lastName.value
            })

            if (updatedUser) {
                location.reload();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    onMounted(async () => {
         const IMask = (await import('imask')).default;

        if (phoneRef.value) {
            phoneMask.value = IMask(phoneRef.value, {
                mask: '+{998} (00) 000-00-00',
                lazy: false
            });

            phoneMask.value.on('accept', () => {
                phone.value = phoneMask.value.unmaskedValue;
            });
        }

        if (otpRef.value) {
            otpMask.value = IMask(otpRef.value, {
                mask: '0000'
            });
        }

        if (otpRef.value) {
            otpMask.value = IMask(otpRef.value, {
                mask: '0000'
            });
        }
    });

    watch(
        () => step.value,
        async (current) => {
            if (current === 3) {
                await userStore.fetchProfile();

                if (userStore.profile?.firstName && userStore.profile?.lastName) {
                    location.reload();
                }
            }
        }
    );


</script>

<style lang="scss">
    @import '~/assets/styles/features/forms/registration.scss';
</style>
