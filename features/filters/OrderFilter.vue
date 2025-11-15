<template>
    <div class="order__filter">
        <div class="order__filter-tab">
            <ul class="order__filter-tab-list">
                <li 
                    class="order__filter-tab-li" 
                    v-for="item in relevationTabList" 
                    :key="item.type"
                >
                    <NuxtLink 
                        :to="{ path: route.path, query: { ...route.query, relevation: item.type } }"
                        class="order__filter-tab-link"
                        :class="{ 'active': route.query.relevation === item.type }"
                    >
                        {{ item.text }}
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <div class="order__filter-tab">
            <ul class="order__filter-tab-list">
                <li 
                    class="order__filter-tab-li" 
                    v-for="item in ticketTypeList" 
                    :key="item.type"
                >
                    <NuxtLink 
                        :to="{ path: route.path, query: { ...route.query, ticket_type: item.type } }"
                        class="order__filter-tab-link"
                        :class="{ 'active': route.query.ticket_type === item.type }"
                    >
                        {{ item.text }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const relevationTabList: Ref<object[]> = ref([
        {
            text: 'Активные',
            type: 'active'
        },
        {
            text: 'Архив',
            type: 'archive'
        }
    ]);

    const ticketTypeList: Ref<object[]> = ref([
        {
            text: 'Авиабилеты',
            type: 'air'
        },
        {
            text: 'Ж/д билеты',
            type: 'train'
        }
    ]);

    const defaultQuery = {
        relevation: 'active',
        ticket_type: 'air'
    };

    const mergedQuery = {
        ...defaultQuery,
        ...route.query
    };

    router.replace({
        path: route.path,
        query: mergedQuery
    });
</script>


<style lang="scss">
    @import '~/assets/styles/features/filters/order.scss';
</style>