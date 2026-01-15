<template>
    <div class="pagination">
        <NuxtLink 
            class="pagination__link"
            :class="{ disabled: currentPage === 1 }"
            @click="prevPage"
        >
            <span class="pagination__icon">
                <LeftIcon />
            </span>
        </NuxtLink>

        <NuxtLink
            v-for="page in totalPages"
            :key="page"
            class="pagination__link"
            :class="{ active: currentPage === page }"
            @click="setPage(page)"
        >
            <p class="pagination__text">{{ page }}</p>
        </NuxtLink>

        <NuxtLink 
            class="pagination__link"
            :class="{ disabled: currentPage === totalPages }"
            @click="nextPage"
        >
            <span class="pagination__icon">
                <RightIcon />
            </span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

    import { ref } from 'vue';

    const LeftIcon = defineAsyncComponent(() => import('~/shared-ui/icons/pagination/Left.vue'));
    const RightIcon = defineAsyncComponent(() => import('~/shared-ui/icons/pagination/Right.vue'));

    const totalPages = 4;
    const currentPage = ref(1);

    const setPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            currentPage.value = page;
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value -= 1;
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPages) {
            currentPage.value += 1;
        }
    };

</script>

<style lang="scss">
    @import '~/assets/styles/features/pagination/pagination.scss';
</style>
