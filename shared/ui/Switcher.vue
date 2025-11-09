<template>
    <label class="switch">
        <input
            type="checkbox"
            class="switch__input"
            :checked="modelValue"
            @change="emit('update:modelValue', !modelValue)"
        />
        <span class="switch__slider"></span>
  </label>
</template>

<script setup lang="ts">

    interface Props {
        modelValue: boolean;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
    }>()

</script>