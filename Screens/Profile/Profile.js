import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    AppState,
    ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ProfileComputerComponent from "../../Components/ProfileComputerComponent";
import { defineLocale } from "../../utils/locale/defineLocale";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchUsername } from "../../utils/profile/info/fetchUsername";
import LoadingLocale from "../../Components/LoadingLocale";
import { detectTheme } from "../../utils/theme/detectTheme";
import BuildCost from "../../utils/profile/info/buildCost";

const Profile = () => {
    const [buildPrice, setBuildPrice] = useState(null);
    const [username, setUsername] = useState("");
    const [colors, setColors] = useState("");
    const [language, setLanguage] = useState(null);
    const navigation = useNavigation();
    let lang = "en";

    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }

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
        fetchUsername().then((r) => {
            setUsername(r);
        });
    });

    async function setOverallBuildPrice() {
        await BuildCost().then((res) => {
            setBuildPrice(res);
        });
    }

    useEffect(() => {
        setOverallBuildPrice();
    });

    useFocusEffect(
        React.useCallback(() => {
            setOverallBuildPrice();
        })
    );

    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            setLanguage(language);
        }
        fetchLanguage();
    }, []);

    if (!language) {
        return <LoadingLocale />;
    } else if (!colors) {
        return;
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ backgroundColor: colors.appBackground }}>
                    <View
                        style={{
                            paddingHorizontal: 10,
                        }}>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 14,
                                marginTop: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 26,
                                    fontWeight: 700,
                                    color: colors.textColor,
                                    width: "70%",
                                }}
                                numberOfLines={1}>
                                👋 {language.profile_welcome},{" "}
                                {username ? username : "Loading..."}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Settings");
                                }}>
                                <Text
                                    style={{
                                        color: colors.accent,
                                        fontWeight: "600",
                                        fontSize: 16,
                                    }}>
                                    {language.settings_header}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {buildPrice != 0 ? (
                            <View
                                style={{
                                    marginBottom: 8,
                                    marginTop: -10,
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        color: "gray",
                                    }}>
                                    {language.profile_build_price}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        color: colors.textColor,
                                    }}>
                                    {buildPrice}UAH (
                                    {Math.round(buildPrice / 32.84)}$)
                                </Text>
                            </View>
                        ) : null}
                        <View style={{ height: "100%" }}>
                            <ProfileComputerComponent
                                ComponentType="CPU"
                                ComponentLocalizedType="CPU"
                                LocalizedComponentName={
                                    language.basic_component_cpu
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="GPU"
                                ComponentLocalizedType="GPU"
                                LocalizedComponentName={
                                    language.basic_component_gpu
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="Motherboard"
                                ComponentLocalizedType="Motherboard"
                                LocalizedComponentName={
                                    language.basic_component_motherboard
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="RAM"
                                ComponentLocalizedType="RAM"
                                LocalizedComponentName={
                                    language.basic_component_ram
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="SSD"
                                ComponentLocalizedType="SSD"
                                LocalizedComponentName={
                                    language.basic_component_ssd
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="PSU"
                                ComponentLocalizedType="PSU"
                                LocalizedComponentName={
                                    language.basic_component_psu
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                            <ProfileComputerComponent
                                ComponentType="Case"
                                ComponentLocalizedType="Case"
                                LocalizedComponentName={
                                    language.basic_component_case
                                }
                                updateBuildPrice={setOverallBuildPrice}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
};

export default Profile;
