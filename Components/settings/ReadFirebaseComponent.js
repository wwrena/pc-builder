import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, NativeModules } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref } from "firebase/database";
import { db } from "../../utils/Firebase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoadingLocale from "../LoadingLocale";
import { defineLocale } from "../../utils/locale/defineLocale";
import { detectTheme } from "../../utils/theme/detectTheme";

export const ReadFirebaseComponent = () => {
    const [builds, setBuilds] = useState();
    const [colors, setColors] = useState();

    useEffect(() => {
        detectTheme().then((res) => {
            const theme = res.default;
            setColors(theme);
        });
    });
    useEffect(() => {
        getFirebaseBuilds();
    }, []);

    const [language, setLanguage] = useState(null);
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
            const buildRef = ref(db, `/${uid}`);
            onValue(buildRef, (snapshot) => {
                const builds = snapshot.val();
                if (builds) {
                    const buildNames = Object.keys(builds);
                    setBuilds(buildNames);
                }
            });
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
                    display: "flex",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    width: "92%",
                    flexDirection: "row",
                }}
            >
                {builds ? (
                    <Text
                        style={{
                            color: colors.textSubColor,
                            fontWeight: "600",
                        }}
                    >
                        {language.settings_your_builds}:{" "}
                    </Text>
                ) : (
                    <Text
                        style={{
                            width: "100%",
                            color: colors.textSubColor,
                            fontWeight: "600",
                        }}
                    >
                        {language.no_builds_yet}
                    </Text>
                )}
                {builds
                    ? builds.map((build, index) => (
                          <React.Fragment key={index}>
                              <Text
                                  style={{
                                      color: colors.textColor,
                                      fontWeight: "600",
                                  }}
                              >
                                  {build}{" "}
                              </Text>
                          </React.Fragment>
                      ))
                    : null}
            </View>
        </>
    );
};
