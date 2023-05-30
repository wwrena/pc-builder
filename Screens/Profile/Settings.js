import {
    View,
    Text,
    NativeModules,
    TouchableOpacity,
    TextInput,
    AppState,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LoadingLocale from "../../Components/LoadingLocale";
import { defineLocale } from "../../utils/locale/defineLocale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ProfileWriteFirebase } from "../../utils/profile/database/ProfileWriteFirebase";
import Icon from "react-native-vector-icons/FontAwesome";
import { ReadFirebaseComponent } from "../../Components/settings/ReadFirebaseComponent";
import { WriteBuildFromFirebaseComponent } from "../../Components/settings/WriteBuildFromFirebaseComponent";
import { detectTheme } from "../../utils/theme/detectTheme";
import { DeleteAndLogoutAccount } from "../../Components/settings/DeleteAndLogoutAccount";
import ImportByUIDComponent from "../../Components/settings/ImportByUIDComponent";

const Settings = () => {
    const [language, setLanguage] = useState(null);
    const [BuildNameField, setBuildNameField] = useState("");
    const [BuildList, setBuildList] = useState();
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

    function handleFieldChange(e) {
        setBuildNameField(e);
    }
    let lang = "en";
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }
    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            const data = await AsyncStorage.getItem("data");
            setLanguage(language);
        }
        fetchLanguage();
    }, []);

    async function saveToFirebase() {
        try {
            ProfileWriteFirebase(BuildNameField);
            if (!BuildNameField) {
                setBuildList("default");
                const intervalId = setInterval(() => {
                    setBuildList("");
                }, 5000);

                return () => {
                    clearInterval(intervalId);
                };
            } else {
                setBuildList(BuildNameField);
                const intervalId = setInterval(() => {
                    setBuildList("");
                }, 5000);

                return () => {
                    clearInterval(intervalId);
                };
            }
        } catch (err) {
            Toast.show({
                type: "error",
                text1: `Error occured:`,
                text2: `${err.message}`,
                position: "bottom",
            });
        }
    }
    if (!language) {
        return <LoadingLocale />;
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView
                    style={{
                        backgroundColor: colors.modal_background,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <Text
                            style={{
                                marginHorizontal: 16,
                                marginVertical: 10,
                                fontSize: 36,
                                fontWeight: 700,
                                color: colors.textColor,
                            }}
                        >
                            {language.settings_header}
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                position: "relative",
                                left: -36,
                                marginHorizontal: 10,
                                marginBottom: 4,
                            }}
                        >
                            <Icon
                                name="pencil"
                                color="rgba(80,80,80,1)"
                                size={22}
                                style={{
                                    marginRight: 16,
                                    position: "relative",
                                    right: -44,
                                    zIndex: 999,
                                }}
                            />
                            <TextInput
                                placeholderTextColor="gray"
                                clearButtonMode="always"
                                placeholder={language.build_placeholder}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.subAppBackground,
                                    color: colors.textColor,
                                    paddingVertical:
                                        Platform.OS === "android" ? 8 : 12,
                                    fontWeight: "600",
                                    paddingHorizontal: 6,
                                    borderRadius: 6,
                                    paddingLeft: 44,
                                }}
                                onChangeText={handleFieldChange}
                                value={BuildNameField}
                                maxLength={24}
                            ></TextInput>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginHorizontal: 16,
                                alignItems: "center",
                                marginBottom: 4,
                            }}
                        >
                            {BuildList ? (
                                <>
                                    <Text
                                        style={{
                                            color: colors.textSubColor,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {language.settings_wrote_build_1}{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors.textColor,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {BuildList}
                                    </Text>
                                    <Text
                                        style={{
                                            color: colors.textSubColor,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {" "}
                                        {language.settings_wrote_build_2}
                                    </Text>
                                </>
                            ) : null}
                        </View>
                        <View style={{ display: "flex", alignItems: "center" }}>
                            <ReadFirebaseComponent />
                            <WriteBuildFromFirebaseComponent
                                inputField={BuildNameField}
                            />
                            <View
                                style={{
                                    marginTop: 12,
                                    backgroundColor: colors.subAppBackground,
                                    borderRadius: 6,
                                    width: "95%",
                                    marginBottom: 12,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        saveToFirebase();
                                    }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 8,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "95%",
                                                backgroundColor:
                                                    colors.subAppBackground,
                                                paddingVertical: 12,
                                                paddingHorizontal: 12,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: colors.accent,
                                                    fontWeight: 600,
                                                    fontSize: 15,
                                                }}
                                            >
                                                {language.set_build_to_database}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ display: "flex", alignItems: "center" }}>
                            <ImportByUIDComponent />
                        </View>
                        <View style={{ display: "flex", alignItems: "center" }}>
                            <DeleteAndLogoutAccount />
                            <View
                                style={{
                                    marginTop: 12,
                                    backgroundColor: colors.subAppBackground,
                                    borderRadius: 6,
                                    width: "95%",
                                    marginBottom: 14,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                ></View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
};

export default Settings;
