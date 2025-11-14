<template>
    <button class="button-delete">
        <DeleteIcon />
    </button>
</template>

<script setup lang="ts">
    const DeleteIcon = defineAsyncComponent(() => import('~/shared-ui/icons/global/Delete.vue'));
</script>