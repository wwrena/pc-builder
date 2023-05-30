import { defineLocale } from "../locale/defineLocale";

export async function TranslateComponentType({ ComponentLocalizedType, lang }) {
    let locale = "";

    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    await fetchLanguage();
    if (ComponentLocalizedType == "CPU") {
        if (lang == "en") {
            return locale.component_cpu;
        } else {
            return locale.component_cpu.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "GPU") {
        if (lang == "en") {
            return locale.component_gpu;
        } else {
            return locale.component_gpu.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "Motherboard") {
        if (lang == "en") {
            return locale.component_motherboard;
        } else {
            return locale.component_motherboard.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "RAM") {
        if (lang == "en") {
            return locale.component_ram;
        } else {
            return locale.component_ram.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "SSD") {
        return locale.component_ssd;
    }
    if (ComponentLocalizedType == "HDD") {
        if (lang == "en") {
            return locale.component_hdd;
        } else {
            return locale.component_hdd.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "PSU") {
        if (lang == "en") {
            return locale.component_psu;
        } else {
            return locale.component_psu.toLowerCase();
        }
    }
    if (ComponentLocalizedType == "Case") {
        if (lang == "en") {
            return locale.component_case;
        } else {
            return locale.component_case.toLowerCase();
        }
    }
}
