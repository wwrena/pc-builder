import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    NativeModules,
    AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../utils/Firebase";
import { defineLocale } from "../../utils/locale/defineLocale";
import LoadingLocale from "../LoadingLocale";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { detectTheme } from "../../utils/theme/detectTheme";

export const WriteBuildFromFirebaseComponent = ({ inputField }) => {
    const [language, setLanguage] = useState(null);
    const [colors, setColors] = useState();

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

    let lang = "en";
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }

    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            setLanguage(language);
        }
        fetchLanguage();
    }, []);

    async function getFirebaseBuilds() {
        const raw = await AsyncStorage.getItem("data");
        const data = JSON.parse(raw);
        const uid = data.uid;

        try {
            if (inputField) {
                const buildRef = ref(db, `/${uid}/${inputField}`);
                onValue(buildRef, async (snapshot) => {
                    const builds = snapshot.val();
                    if (builds) {
                        if (builds.cpu) {
                            await AsyncStorage.setItem("CPU", builds.cpu);
                        }
                        if (builds.gpu) {
                            await AsyncStorage.setItem("GPU", builds.gpu);
                        }
                        if (builds.motherboard) {
                            await AsyncStorage.setItem(
                                "Motherboard",
                                builds.motherboard
                            );
                        }
                        if (builds.ram) {
                            await AsyncStorage.setItem("RAM", builds.ram);
                        }
                        if (builds.ssd) {
                            await AsyncStorage.setItem("drive1", builds.ssd);
                        }
                        if (builds.psu) {
                            await AsyncStorage.setItem("PSU", builds.psu);
                        }
                        if (builds.pc_case) {
                            await AsyncStorage.setItem("Case", builds.pc_case);
                        }
                    }
                });
            } else if (!inputField) {
                const buildRef = ref(db, `/${uid}/default`);
                onValue(buildRef, async (snapshot) => {
                    const builds = snapshot.val();
                    if (builds) {
                        if (builds.cpu) {
                            await AsyncStorage.setItem("CPU", builds.cpu);
                        }
                        if (builds.gpu) {
                            await AsyncStorage.setItem("GPU", builds.gpu);
                        }
                        if (builds.motherboard) {
                            await AsyncStorage.setItem(
                                "Motherboard",
                                builds.motherboard
                            );
                        }
                        if (builds.ram) {
                            await AsyncStorage.setItem("RAM", builds.ram);
                        }
                        if (builds.ssd) {
                            await AsyncStorage.setItem("drive1", builds.ssd);
                        }
                        if (builds.psu) {
                            await AsyncStorage.setItem("PSU", builds.psu);
                        }
                        if (builds.pc_case) {
                            await AsyncStorage.setItem("Case", builds.pc_case);
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteFirebaseBuild() {
        const raw = await AsyncStorage.getItem("data");

        const buildName = inputField;
        await AsyncStorage.multiRemove([
            "CPU",
            "GPU",
            "Motherboard",
            "RAM",
            "drive1",
            "PSU",
            "Case",
        ]);

        const data = JSON.parse(raw);
        const uid = data.uid;

        try {
            if (!inputField) {
                set(ref(db, `/${uid}/default`), {});
            } else {
                set(ref(db, `/${uid}/${buildName}`), {});
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (!language) {
        return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <LoadingLocale />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <>
            <View
                style={{
                    marginTop: 8,
                    display: "flex",
                    width: "95%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.subAppBackground,
                    borderRadius: 6,
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        width: "95%",
                        borderBottomColor: colors.borderColor,
                        borderBottomWidth: 1,
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            getFirebaseBuilds();
                        }}
                    >
                        <Text
                            style={{
                                color: colors.accent,
                                fontWeight: "600",
                                fontSize: 15,
                            }}
                        >
                            {language.get_build_from_database}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        width: "95%",
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            deleteFirebaseBuild();
                        }}
                    >
                        <Text
                            style={{
                                color: colors.red,
                                fontWeight: "600",
                                fontSize: 15,
                            }}
                        >
                            {language.remove_build_from_database}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
