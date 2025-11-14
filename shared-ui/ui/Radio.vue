<template>
    <div class="radio__container">
        <input type="radio" class="input-radio">
        <label class="radio__label">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">

    interface RadioProps {
        modelValue: boolean;
        label: string;
    }

    const { modelValue, label } = defineProps<RadioProps>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
    }>()

</script>