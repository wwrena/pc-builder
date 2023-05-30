import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    NativeModules,
    Alert,
} from "react-native";
import { defineLocale } from "../../utils/locale/defineLocale";
import LoadingLocale from "../LoadingLocale";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { detectTheme } from "../../utils/theme/detectTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { db } from "../../utils/Firebase";
import { ref, set } from "firebase/database";

export const DeleteAndLogoutAccount = () => {
    const [language, setLanguage] = useState(null);
    const [colors, setColors] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        detectTheme().then((res) => {
            const theme = res.default;
            setColors(theme);
        });
    });

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

    function logout() {
        Alert.alert(language.alert_logout_header, language.alert_logout_text, [
            {
                text: language.alert_logout_cancel,
                style: "cancel",
            },
            {
                text: language.alert_logout_confirm,
                style: "destructive",
                onPress: () => {
                    actualLogout();
                },
            },
        ]);
    }

    async function deleteAccount() {
        Alert.alert(language.alert_delete_header, language.alert_delete_text, [
            {
                text: language.alert_logout_cancel,
                style: "cancel",
            },
            {
                text: language.alert_delete_button,
                style: "destructive",
                onPress: async () => {
                    try {
                        const firebaseAuth = await import(
                            "../../utils/Firebase"
                        );
                        const user = firebaseAuth.auth.currentUser;
                        const raw = await AsyncStorage.getItem("data");
                        const data = JSON.parse(raw);
                        const uid = data.uid;
                        set(ref(db, `/${uid}/`), {});
                        await user.delete();
                        navigation.goBack();
                        actualLogout();
                        Toast.show({
                            type: "success",
                            text1: language.account_was_removed_toast,
                            position: "bottom",
                        });
                    } catch (err) {
                        Toast.show({
                            type: "error",
                            text1: `Error occured:`,
                            text2: `${err.message}`,
                            position: "bottom",
                        });
                    }
                },
            },
        ]);
    }

    async function actualLogout() {
        await AsyncStorage.removeItem("CPU");
        await AsyncStorage.removeItem("GPU");
        await AsyncStorage.removeItem("Motherboard");
        await AsyncStorage.removeItem("RAM");
        await AsyncStorage.removeItem("SSD");
        await AsyncStorage.removeItem("drive1");
        await AsyncStorage.removeItem("data");
        await AsyncStorage.removeItem("uid");
        await AsyncStorage.removeItem("Case");
        await AsyncStorage.removeItem("PSU");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("kUserName");

        navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
        });
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
                    marginTop: 0,
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
                            deleteAccount();
                        }}
                    >
                        <Text
                            style={{
                                color: colors.red,
                                fontWeight: "600",
                                fontSize: 15,
                            }}
                        >
                            {language.settings_delete_account}
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
                            logout();
                        }}
                    >
                        <Text
                            style={{
                                color: colors.red,
                                fontWeight: "600",
                                fontSize: 15,
                            }}
                        >
                            {language.settings_logout}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
