<template>
    <input :type="type" :placeholder="placeholder" class="input" :style="{ width }">
</template>

<script setup lang="ts">

    interface InputProps {
        placeholder: string;
        type: string;
        width: string;
    }

    const { placeholder, type, width } = defineProps<InputProps>();

</script>