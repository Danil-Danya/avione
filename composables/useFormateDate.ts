import { computed, Ref } from 'vue';

export const useFormattedDate = (date: Ref<Date | null>) => {
    const formatted = computed(() => {
        if (!date.value) {
            return '';
        }

        const day = String(date.value.getDate()).padStart(2, '0');
        const month = String(date.value.getMonth() + 1).padStart(2, '0');
        const year = date.value.getFullYear();

        return `${day}.${month}.${year} г.`;
    });

    return { formatted };
};
