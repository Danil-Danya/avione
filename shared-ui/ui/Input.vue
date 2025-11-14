<template>
    <input 
        :type="type"
        :placeholder="placeholder" 
        :value="modelValue"
        @input="onInput"
        class="input" 
        ref="inputRef"
        :style="{ width }"
    >
</template>

<script setup lang="ts">

    import IMask, { InputMask } from 'imask';

    interface InputProps {
        placeholder: string;
        modelValue: string;
        type: string;
        width: string;
    }

    const { placeholder, type, width, modelValue } = defineProps<InputProps>();

    let mask: InputMask<any> | null = null;
    const inputRef = ref(null);

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    onMounted(() => {
        switch (type) {
            case 'tel': {
                mask = IMask(inputRef.value, {
                    mask: '+{998} (00) 000-00-00'
                });
                break;
            }
            case 'card': {
                mask = IMask(inputRef.value, {
                    mask: '0000 0000 0000 0000'
                });
                break;
            }
            case 'MMYY': {
                mask = IMask(inputRef.value, {
                    mask: '00/00'
                });
                break;
            }
            default: {
                mask = null;
                break;
            }
        }

        if (mask) {
            if (modelValue) {
                mask.value = modelValue;
            }

            mask.on('accept', () => {
                emit('update:modelValue', mask ? String(mask.value) : '');
            });
        }
    });

    const onInput = (e: Event) => {
        if (!mask) {
            const target = e.target as HTMLInputElement;
            emit('update:modelValue', target.value);
        }
    };

</script>