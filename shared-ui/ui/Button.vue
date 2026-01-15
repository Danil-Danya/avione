<template>
    <button type="button" class="button"
        :style="{
            background,
            padding
        }"
    >
        {{ text }}
    </button>
</template>

<script setup lang="ts">

    interface ButtonProps {
        background: string;
        padding: string;
        text: string;
    }

    const { background, padding, text } = defineProps<ButtonProps>();

</script>