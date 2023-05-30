import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../locale/defineLocale";

export const PSUGetLocalProfile = async (lang) => {
    async function fetchLanguage() {
        const language = await defineLocale(lang);
        locale = language;
    }
    fetchLanguage();
    const r = await AsyncStorage.getItem("PSU");
    const res = JSON.parse(r);

    if (res?.name) {
        return {
            name: res.name,
            tags: `${res.power_capacity ? `${res.power_capacity}W` : null}${
                res.gpu_connector ? " - " + res.gpu_connector : null
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
