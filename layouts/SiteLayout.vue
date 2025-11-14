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

</script>