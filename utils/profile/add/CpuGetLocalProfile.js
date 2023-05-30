import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const CpuGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("CPU");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: res.name,
            tags: `${res.socket ? res.socket : locale.cpu_no_socket} - ${
                res.cpu_cores
            } ${locale.cpu_cores} ${
                res.price
                    ? "- " +
                      res.price +
                      ` UAH (${Math.round(res.price / 32.84)}$)`
                    : ""
            }`,
        };
    }
};
