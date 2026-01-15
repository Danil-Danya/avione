<template>
    <label class="radio__container">
        <input
            type="radio"
            class="input-radio"
            :checked="modelValue === value"
            @change="onChange"
        >
        <span class="radio__label">
            {{ label }}
        </span>
    </label>
</template>

<script setup lang="ts">
    interface RadioProps {
        modelValue: string;
        value: string;
        label: string;
    }

    const { modelValue, value, label } = defineProps<RadioProps>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>();

    const onChange = () => {
        emit('update:modelValue', value);
    };
</script>

