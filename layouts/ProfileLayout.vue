<template>
    <header class="header">
        <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" :is-open="isSidebarOpen" />
    </header>

    <main class="main">
        <div class="container">
            <div class="main__container">
                <Sidebar v-if="isSidebarOpen" @close="closeSidebar" />
                <ClientOnly>
                    <NuxtPage class="main__page"/>
                </ClientOnly>
            </div>
        </div>
    </main>

    <footer class="footer">
        <Footer />
    </footer>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { useIsMobile } from '~/composables/useIsMobile';
    import { useRoute } from 'vue-router'
    import { useUserApi } from '~/composables/users/lib/useApi';

    import Navbar from '~/shared-ui/layouts/Navbar.vue';
    import Footer from '~/shared-ui/layouts/Footer.vue';
    import Sidebar from '~/shared-ui/layouts/Sidebar.vue';

    const isSidebarOpen = ref(true);

    const isMobile = useIsMobile();

    onMounted(() => {
        if (isMobile.value) {
            isSidebarOpen.value = false;
        }
    })
    
    const route = useRoute();
    
    const closeSidebar = () => {
        setTimeout(() => {
            isSidebarOpen.value = false;
        }, 300);
    }

    const checkAuth = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const { refreshUser } = useUserApi();
        

        if (accessToken) {
            const newTokens = await refreshUser(refreshToken);

            if (newTokens.payload) {
                const tokens = newTokens.payload;

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                localStorage.setItem('accessToken', tokens.accessToken);
                localStorage.setItem('refreshToken', tokens.refreshToken);
            }
        }
    }

    onMounted(async () => {
        console.log('dfsdfs');
        await checkAuth();
    })

    // watch(
    //     () => route.fullPath,
    //     () => {
    //         if (isMobile.value && isSidebarOpen.value) {
    //             isSidebarOpen.value = false;
    //             console.log(isSidebarOpen.value);
                
    //         }
    //     }
    // );
    
</script>
