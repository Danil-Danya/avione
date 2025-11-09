<template>
    <label class="checkbox">
        <input type="checkbox" v-model="checked" />
        <span class="checkmark"></span>
    </label>
</template>

<script setup lang="ts">
    const checked = ref(false);
</script>

