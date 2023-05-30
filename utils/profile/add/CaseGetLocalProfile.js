import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const CaseGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("Case");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: res.name,
            tags: `${res.size}${
                res.price
                    ? " - " +
                      res.price +
                      ` UAH (${Math.round(res.price / 32.84)}$)`
                    : ""
            }`,
        };
    }
};
