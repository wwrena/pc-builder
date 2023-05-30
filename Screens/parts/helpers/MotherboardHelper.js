import { useState, useEffect } from "react";
import { View, Text, NativeModules } from "react-native";
import LoadingLocale from "../../../Components/LoadingLocale";
import { defineLocale } from "../../../utils/locale/defineLocale";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { detectTheme } from "../../../utils/theme/detectTheme";

const MotherboardHelper = () => {
    const [language, setLanguage] = useState(null);
    let lang = "en";
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }

    const [colors, setColors] = useState("");
    useEffect(() => {
        detectTheme().then((res) => {
            const theme = res.default;
            setColors(theme);
        });
    });

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
                        {language.motherboard_note}{" "}
                        <Text style={{ color: colors.textColor }}>
                            form_factor:ATX
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
                                Asus TUF GAMING X570
                            </Text>{" "}
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
                            {language.motherboard_socket}{" "}
                            <Text style={{ color: colors.textColor }}>
                                socket:AM4
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
                            {language.motherboard_form_factor}{" "}
                            <Text style={{ color: colors.textColor }}>
                                form_factor:Micro ATX
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
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginBottom: 16,
                        }}
                    >
                        <Text style={{ color: "gray", fontWeight: "600" }}>
                            {language.cpu_helper_search_note_1}{" "}
                            <Text style={{ color: colors.textColor }}>
                                form_factor:ATX socket:AM4
                            </Text>{" "}
                            {language.cpu_helper_search_note_2}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default MotherboardHelper;
