<template>
    <div class="card__block">
        <CardTab />
        <Cards />
    </div>
</template>

<script lang="ts" setup>

    import CardTab from '~/features/tabs/CardTab.vue';
    import Cards from '~/shared-ui/pages/cards/Cards.vue';

    definePageMeta({
        layout: 'profile-layout'
    })

</script>