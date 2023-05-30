import { useState, useEffect } from "react";
import { View, Text, NativeModules, AppState } from "react-native";
import LoadingLocale from "../../../Components/LoadingLocale";
import { defineLocale } from "../../../utils/locale/defineLocale";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { detectTheme } from "../../../utils/theme/detectTheme";

const RAMHelper = () => {
    const [language, setLanguage] = useState(null);
    let lang = "en";
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }

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

    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            setLanguage(language);
        }
        fetchLanguage();
    }, []);

    if (!language || !colors) {
        return <LoadingLocale />;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: colors.appBackground }}>
                <View
                    style={{
                        padding: 14,
                        backgroundColor: colors.modal_background,
                        height: "100%",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "700",
                            marginBottom: 16,
                            color: colors.textColor,
                        }}
                    >
                        {language.cpu_helper_header}
                    </Text>
                    <Text
                        style={{
                            fontWeight: "600",
                            color: "gray",
                            marginBottom: 16,
                        }}
                    >
                        {language.gpu_helper_note}
                        <Text style={{ color: colors.textColor }}>
                            capacity:240GB
                        </Text>
                        )
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: "gray", fontWeight: "600" }}>
                            {language.cpu_helper_basic_search}{" "}
                            <Text style={{ color: colors.textColor }}>
                                Kingston A400
                            </Text>
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: "gray", fontWeight: "600" }}>
                            {language.gpu_helper_memory_search}{" "}
                            <Text style={{ color: colors.textColor }}>
                                capacity:1TB
                            </Text>
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: "gray", fontWeight: "600" }}>
                            {language.cpu_helper_min_price_search}{" "}
                            <Text style={{ color: colors.textColor }}>
                                min_price:999
                            </Text>{" "}
                            {language.cpu_helper_min_price_search_note}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: "gray", fontWeight: "600" }}>
                            {language.cpu_helper_max_price_search}{" "}
                            <Text style={{ color: colors.textColor }}>
                                max_price:24000
                            </Text>{" "}
                            {language.cpu_helper_max_price_search_note}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default RAMHelper;
