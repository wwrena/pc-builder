import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const RAMGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("RAM");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: `${res.name}`,
            tags: `${res.memory_type ? res.memory_type : ""}${
                res.freq ? " - " + res.freq + "MHz" : ""
            }${
                res.price
                    ? " - " +
                      res.price +
                      ` UAH (${Math.round(res.price / 32.84)}$)`
                    : ""
            }`,
        };
    }
};
