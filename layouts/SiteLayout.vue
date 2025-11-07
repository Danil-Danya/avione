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

    import Navbar from '~/shared/layouts/Navbar.vue';
    import Footer from '~/shared/layouts/Footer.vue';

</script>