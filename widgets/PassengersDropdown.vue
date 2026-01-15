<template>
    <div class="passengers" @click.stop>
        <div class="passengers__trigger" @click="toggle">
            <p class="passengers__text">
                {{ totalPassengers }} {{ $t('inputPassengers') }}
            </p>
            <!-- <p class="passengers__class">
                {{ model.class === 0 ? $t('classEconomy') : $t('classBusiness') }}
            </p> -->

            <ArrowIcon />
        </div>

        <Transition name="fade">
            <div class="passengers__dropdown" v-if="open">
                <div 
                    v-for="item in items"
                    :key="item.key"
                    class="passengers__item"
                >
                    <div>
                        <p class="title">{{ $t(item.label) }}</p>
                        <p class="sub">{{ item.sub }}</p>
                    </div>

                    <div class="counter">
                        <button @click="dec(item.key)">−</button>
                        <span>{{ model[item.key] }}</span>
                        <button @click="inc(item.key)">+</button>
                    </div>
                </div>

                <div class="class-select">
                    <label>
                        <input 
                            type="radio"
                            :value="0"
                            v-model="model.class"
                        />
                        {{ $t('classEconomy') }}
                    </label>

                    <label>
                        <input 
                            type="radio"
                            :value="1"
                            v-model="model.class"
                        />
                        {{ $t('classBusiness') }}
                    </label>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">

    const ArrowIcon = defineAsyncComponent(() => import('~/shared-ui/icons/filters/Arrow.vue'));

    const props = defineProps<{
        modelValue: {
            adultCount: number,
            childCount: number,
            infantCount: number,
            class: number
        };
    }>();

    const emit = defineEmits(['update:modelValue']);

    const open = ref(false);

    const model = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        }
    });

    const toggle = () => {
        open.value = !open.value;
    };

    const items = [
        { key: 'adultCount', label: 'passengerAdult', sub: '(12+)' },
        { key: 'childCount', label: 'passengerChildren', sub: '(2–11)' },
        { key: 'infantCount', label: 'passengerInfant', sub: '(0–1)' }
    ];

    const inc = (key: string) => {
        model.value[key] += 1;
    };

    const dec = (key: string) => {
        if (model.value[key] > 0) {
            model.value[key] -= 1;

            if (key === 'adultCount' && model.value[key] === 0) {
                model.value[key] = 1;
            }
        }
    };

    const totalPassengers = computed(() => {
        return model.value.adultCount +
               model.value.childCount +
               model.value.infantCount;
    });

    onMounted(() => {
        document.body.addEventListener('click', () => {
            open.value = false;
        });
    });

</script>

<style lang="scss">

.passengers {
    position: relative;
    margin: 0;
}

.passengers__trigger {
    cursor: pointer;
    display: flex;
    display: flex;
    gap: 10px;
    align-items: center;
}

.passengers__dropdown {
    position: absolute;
    background: #fff;
    top: 45px;
    right: 0;
    width: 260px;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0px 4px 15px rgba(0,0,0,0.12);
    z-index: 50;
}

.passengers__item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .title {
        font-size: 16px;
        font-weight: 600;
    }

    .sub {
        font-size: 12px;
        color: #707070;
    }

    .counter {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
            background: #f2f2f2;
            width: 30px;
            height: 30px;
            border-radius: 6px;
            font-size: 22px;
            border: 1px solid rgb(46, 74, 181);
        }

        span {
            width: 20px;
            text-align: center;
            font-size: 16px;
        }
    }
}

.class-select {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
    }
}

</style>
