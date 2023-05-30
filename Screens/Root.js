import React, { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    NativeModules,
    View,
    AppState,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { defineLocale } from "../utils/locale/defineLocale";
import LoadingLocale from "../Components/LoadingLocale";
import { auth } from "../utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNetInfo } from "@react-native-community/netinfo";
import { detectTheme } from "../utils/theme/detectTheme";

const Root = () => {
    const [language, setLanguage] = useState(null);
    const connection = useNetInfo();
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

    async function loginWithEmailAndPassword() {
        if (connection.isConnected == true) {
            signInWithEmailAndPassword(
                auth,
                LoginCredentials,
                PasswordCredentials
            )
                .then((userCredential) => {
                    const data = JSON.stringify(userCredential.user);
                    setUserData(
                        userCredential.user.uid,
                        userCredential.user.displayName,
                        data
                    );
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Profile" }],
                    });
                    setLoginCredentials();
                    setPasswordCredentials();
                })
                .catch((error) => {
                    if (
                        error.message ==
                            "Firebase: Error (auth/missing-email)." ||
                        error.message ==
                            "Firebase: Error (auth/missing-password)."
                    ) {
                        Toast.show({
                            type: "error",
                            text1: language.firebase_login_error_header,
                            text2: language.firebase_missing,
                            position: "bottom",
                        });
                    } else if (
                        error.message == "Firebase: Error (auth/invalid-email)."
                    ) {
                        Toast.show({
                            type: "error",
                            text1: language.firebase_login_error_header,
                            text2: "Incorrect email provided",
                            position: "bottom",
                        });
                    } else if (
                        error.message ==
                        "Firebase: Error (auth/wrong-password)."
                    ) {
                        Toast.show({
                            type: "error",
                            text1: language.firebase_login_error_header,
                            text2: language.firebase_invalid_password,
                            position: "bottom",
                        });
                    } else if (
                        error.message ==
                        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
                    ) {
                        Toast.show({
                            type: "error",
                            text1: language.firebase_login_error_header,
                            text2: language.firebase_account_disabled,
                            position: "bottom",
                        });
                    } else if (
                        error.message ==
                        "Firebase: Error (auth/user-not-found)."
                    ) {
                        Toast.show({
                            type: "error",
                            text1: language.firebase_login_error_header,
                            text2: language.firebase_user_not_found,
                            position: "bottom",
                        });
                    }
                });
        } else if (connection.isConnected == false) {
            Toast.show({
                type: "error",
                text1: "Connection error",
                text2: "No internet connection",
                position: "bottom",
            });
        }
    }

    async function setUserData(uid, username, data) {
        await AsyncStorage.setItem("uid", uid);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("data", data);
    }

    async function auto() {
        const raw = await AsyncStorage.getItem("data");
        const data = JSON.parse(raw);
        if (
            data?.stsTokenManager.accessToken != undefined ||
            data?.stsTokenManager.accessToken != null
        ) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Profile" }],
            });
        }
    }

    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            setLanguage(language);
        }
        fetchLanguage();
        auto();
    }, []);

    const navigation = useNavigation();
    _moveToProfile = async () => {
        if (LoginCredentials != null || LoginCredentials == "") {
            await AsyncStorage.setItem("kUserName", LoginCredentials);
        }
        navigation.navigate("Profile");
    };

    const [LoginCredentials, setLoginCredentials] = useState();
    const [PasswordCredentials, setPasswordCredentials] = useState();

    if (!language || !colors) {
        return (
            <SafeAreaProvider>
                <SafeAreaView>
                    <LoadingLocale />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ backgroundColor: colors.appBackground }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "center",
                            paddingBottom: 12,
                        }}
                    >
                        <TextInput
                            placeholderTextColor="gray"
                            style={{
                                maxWidth: 900,
                                backgroundColor: colors.subAppBackground,
                                borderRadius: 6,
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 11,
                                marginBottom: 12,
                                fontWeight: "500",
                                fontSize: 15,
                                color: colors.textColor,
                            }}
                            value={LoginCredentials}
                            onChangeText={setLoginCredentials}
                            placeholder={language.login_email}
                        />
                        <TextInput
                            placeholderTextColor="gray"
                            style={{
                                maxWidth: 900,
                                backgroundColor: colors.subAppBackground,
                                borderRadius: 6,
                                marginHorizontal: 12,
                                paddingHorizontal: 12,
                                paddingVertical: 11,
                                marginBottom: 12,
                                fontWeight: "500",
                                fontSize: 15,
                                color: colors.textColor,
                            }}
                            value={PasswordCredentials}
                            onChangeText={setPasswordCredentials}
                            placeholder={language.login_password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                loginWithEmailAndPassword();
                            }}
                            style={{
                                maxWidth: 900,
                                backgroundColor: colors.button,
                                marginHorizontal: 12,
                                paddingVertical: 11,
                                display: "flex",
                                borderRadius: 6,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "600",
                                    color: "white",
                                    fontSize: 16,
                                }}
                            >
                                {language.login_button}
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "gray",
                                    textAlign: "center",
                                    marginTop: 16,
                                    fontWeight: 600,
                                }}
                            >
                                {language.dont_have_an_account}{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Register");
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        marginTop: 16,
                                        fontWeight: 600,
                                        color: colors.accent,
                                    }}
                                >
                                    {language.register_button}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
};

export default Root;
