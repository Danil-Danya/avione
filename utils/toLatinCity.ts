import { destinationsFromTashkentLat, destinationsFromTashkentRu } from "~/helpers/cities";
import { useI18n } from "vue-i18n";

export function toLatinCity(city: string): string {
    if (!city) return "";

    const { locale } = useI18n(); 
    const lang = locale.value === "uz" ? "uz" : "ru";

    const cityLower = city.toLowerCase();
    const index = destinationsFromTashkentRu.findIndex(c => c.toLowerCase() === cityLower);

    if (index === -1) return city;

    return lang === "uz" ? destinationsFromTashkentLat[index] : destinationsFromTashkentRu[index];
}

export function toLatinCityDefault(city: string): string {
    if (!city) return "";

    const cityLower = city.toLowerCase();

    const index = destinationsFromTashkentRu.findIndex(c => c.toLowerCase() === cityLower);

    if (index === -1) return city;

    return destinationsFromTashkentLat[index];
}


