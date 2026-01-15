<template>
    <header class="header">
        <Navbar />
    </header>

    <main class="main">
        <NuxtPage />
    </main>

    <footer class="footer">
        <Footer />
    </footer>
</template>

<script setup lang="ts">
    import Navbar from '~/shared-ui/layouts/Navbar.vue';
    import Footer from '~/shared-ui/layouts/Footer.vue';

    import { onMounted } from 'vue';
    import { useUserApi } from '~/composables/users/lib/useApi';

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
            else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }
    }

    // function decodeJwt(token: string): any | null {
    //     try {
    //         const payload = token.split('.')[1];

    //         const base64 = payload
    //             .replace(/-/g, '+')
    //             .replace(/_/g, '/');

    //         return JSON.parse(atob(base64));
    //     }
    //     catch {
    //         return null;
    //     }
    // }

    // function isTokenExpired(token: string): boolean {
    //     const decoded = decodeJwt(token);

    //     if (!decoded || !decoded.exp) {
    //         return true;
    //     }

    //     const now = Math.floor(Date.now() / 1000);
    //     return decoded.exp <= now;
    // }

    onMounted(async () => {
        await checkAuth();
        // const accessToken = localStorage.getItem('accessToken');

        // if (!accessToken) {
        //     return;
        // }

        // if (isTokenExpired(accessToken)) {
        //     localStorage.removeItem('accessToken');
        //     localStorage.removeItem('refreshToken');
        // }
    });
</script>
