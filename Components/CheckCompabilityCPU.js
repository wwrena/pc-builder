import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Platform, NativeModules, AppState } from "react-native";
import { useEffect, useState } from "react";
import { defineLocale } from "../utils/locale/defineLocale";
import { detectTheme } from "../utils/theme/detectTheme";

function CheckCompabilityCPU() {
    let lang;
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }
    const [language, setLanguage] = useState();
    const [cpusocket, setCpuSocket] = useState(null);
    const fetchCpuSocket = async () => {
        const r = await AsyncStorage.getItem("CPU");
        if (r) {
            const res = JSON.parse(r);
            setCpuSocket(res?.socket);
        }
    };
    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            setLanguage(language);
        }
        fetchCpuSocket();
        fetchLanguage();
    }, []);

    const [colors, setColors] = useState("");
    useEffect(() => {
        const loadTheme = async () => {
            const res = await detectTheme();
            const theme = res.default;
            setColors(theme);
        };

        loadTheme();

        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === "active") {
                loadTheme();
            }
        };

        AppState.addEventListener("change", handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", handleAppStateChange);
        };
    }, []);

    if (cpusocket && colors && language) {
        return (
            <View
                style={{
                    marginBottom: 6,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <Text style={{ fontWeight: 600, color: colors.textSubColor }}>
                    {language.cpu_compability}
                    {cpusocket}
                    {language.cpu_compability_2}
                </Text>
            </View>
        );
    }
}

export default CheckCompabilityCPU;
