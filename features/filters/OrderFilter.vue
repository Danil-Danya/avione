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

        <Button 
            text="<"
            background="#2E4AB5"
            padding="15px 30px"
            @click="goToBack"
            v-if="!isMobile"
        />

        <RouterLink to="/" class="search__button" v-if="!isMobile">
            Поиск
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import Button from '~/shared-ui/ui/Button.vue';

    import { useI18n } from 'vue-i18n';
    import { useIsMobile } from '~/composables/useIsMobile';

    const { t } = useI18n();

    const route = useRoute();
    const router = useRouter();
    const isMobile = useIsMobile();

    const goToBack = () => {
        router.go(-1);
    }

    const relevationTabList: Ref<object[]> = ref([
        {
            text: t('relevationActive'),
            type: 'active'
        },
        {
            text: t('relevationArchive'),
            type: 'archive'
        }
    ]);

    const ticketTypeList: Ref<object[]> = ref([
        {
            text: t('tabFlights'),
            type: 'air'
        },
        {
            text: t('tabRailway'),
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