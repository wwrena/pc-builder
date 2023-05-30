import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const MotherboardGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("Motherboard");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: `${res.name}`,
            tags: `${res.socket ? res.socket : null} ${
                res.form_factor ? "- " + res.form_factor : ""
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
