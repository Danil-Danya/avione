<template>
    <header class="header">
        <Navbar />
    </header>

    <main class="main">
        <div class="container">
            <div class="main__container">
                <Sidebar />
                <NuxtPage  class="main__page"/>
            </div>
        </div>
    </main>

    <footer class="footer">
        <Footer />
    </footer>
</template>

<script setup lang="ts">

    import Navbar from '~/shared-ui/layouts/Navbar.vue';
    import Footer from '~/shared-ui/layouts/Footer.vue';
    import Sidebar from '~/shared-ui/layouts/Sidebar.vue';

</script>