<template>
    <section class="ticket__tab">
        <div class="container">
            <div class="ticket__tab-content">
                <ul class="ticket__tab-list">
                    <li class="ticket__tab-li" v-for="link in ticketTabLinks" :key="link">
                        <NuxtLink :to="link.link" class="ticket__tab-link">
                            {{ link.text }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

    import { ref, Ref } from 'vue'

    const ticketTabLinks: Ref = ref([
        {
            text: '1. Бронирование',
            link: '/reservation'
        },

        {
            text: '2. Оплата',
            link: '/payment'
        },

        {
            text: '3. Получение билета',
            link: '/ticket'
        },
    ])

</script>

<style lang="scss">
    @use '~/assets/styles/features/tab/ticket-tab.scss';
</style>