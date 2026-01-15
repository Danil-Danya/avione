export default defineNuxtPlugin(() => {
    const gtagScript = document.createElement('script');

    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XM5NN2H481';
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        window.dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-XM5NN2H481');
});
