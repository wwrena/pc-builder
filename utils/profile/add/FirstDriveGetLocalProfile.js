import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const FirstDriveGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("drive1");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: res.name,
            tags: `${res.capacity}${
                res.form_factor ? " - " + res.form_factor : ""
            }${
                res.price
                    ? ` - ${res.price} UAH (${Math.round(res.price / 32.84)}$)`
                    : null
            }`,
        };
    }
};
