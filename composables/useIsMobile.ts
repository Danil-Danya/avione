import { ref, onMounted } from "vue";

export const useIsMobile = (): Ref<boolean> => {
    const isMobile: Ref<boolean> = ref(false);

    const checkInMobile = () => {
        isMobile.value = window.innerWidth < 1000;
    }

    onMounted(() => {
        checkInMobile();
        window.addEventListener('resize', () => checkInMobile());
    })

    // onBeforeUnmount(() => {
    //     window.removeEventListener('resize', () => checkIsMobile());
    // })

    return isMobile;
}