<template>
    <label class="checkbox">
        <input 
            type="checkbox" 
            :checked="modelValue"
            @input="toggle"
        />
        <span class="checkmark"></span>
    </label>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: boolean
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void;
    }>();

    const toggle = (e: Event) => {
        const target = e.target as HTMLInputElement;
        emit('update:modelValue', target.checked);
    };
</script>

