import React, { useEffect, useReducer, useState } from "react";
import {
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    NativeModules,
    View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { defineLocale } from "../utils/locale/defineLocale";
import LoadingLocale from "../Components/LoadingLocale";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { detectTheme } from "../utils/theme/detectTheme";

const Register = () => {
    const navigation = useNavigation();
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

    async function registerWithEmailAndPassword() {
        if (ConfirmPasswordCredentials != PasswordCredentials) {
            Toast.show({
                type: "error",
                text1: "Register error",
                text2: language.firebase_password_not_matching,
                position: "bottom",
            });
        } else {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    LoginCredentials,
                    PasswordCredentials,
                    DisplayNameCredentials
                ).then((userCredential) => {
                    if (
                        userCredential.user.email == undefined ||
                        userCredential.user.email == null
                    ) {
                        return;
                    }
                    navigation.goBack();
                });
            } catch (error) {
                if (
                    error.message ==
                    "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ) {
                    Toast.show({
                        type: "error",
                        text1: language.basic_error,
                        text2: language.firebase_too_weak_password,
                        position: "bottom",
                    });
                } else if (
                    error.message ==
                    "Firebase: Error (auth/admin-restricted-operation)."
                ) {
                    Toast.show({
                        type: "error",
                        text1: language.unknown_error,
                        text2: error.message,
                        position: "bottom",
                    });
                }
            }
            await updateProfile(auth.currentUser, {
                displayName: DisplayNameCredentials,
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    _moveToProfile = async () => {
        navigation.navigate("Profile");
    };

    const [LoginCredentials, setLoginCredentials] = useState();
    const [PasswordCredentials, setPasswordCredentials] = useState();
    const [ConfirmPasswordCredentials, setConfirmPasswordCredentials] =
        useState();
    const [DisplayNameCredentials, setDisplayNameCredentials] = useState();

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
                            value={DisplayNameCredentials}
                            onChangeText={setDisplayNameCredentials}
                            placeholder={language.register_username}
                        />
                        <TextInput
                            placeholderTextColor="gray"
                            style={{
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
                        <TextInput
                            placeholderTextColor="gray"
                            style={{
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
                            value={ConfirmPasswordCredentials}
                            onChangeText={setConfirmPasswordCredentials}
                            placeholder={language.confirm_register_password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                registerWithEmailAndPassword();
                            }}
                            style={{
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
                                {language.register_button}
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: 12,
                            }}
                        >
                            <Text
                                style={{
                                    color: "gray",
                                    fontWeight: "500",
                                }}
                            >
                                {language.already_have_account}{" "}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.accent,
                                        fontWeight: "600",
                                    }}
                                >
                                    {language.login_button}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
};

export default Register;
