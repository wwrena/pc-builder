import { useState, useEffect } from "react";
import { detectTheme } from "../../utils/theme/detectTheme";
import {
    View,
    Text,
    TextInput,
    NativeModules,
    Platform,
    TouchableOpacity,
    AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defineLocale } from "../../utils/locale/defineLocale";
import Icon from "react-native-vector-icons/FontAwesome";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../utils/Firebase";

function ImportByUIDComponent() {
    const [language, setLanguage] = useState(null);
    const [colors, setColors] = useState();
    const [UIDText, setUIDText] = useState("");
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

    function handleFieldChange(e) {
        setUIDText(e);
    }

    useEffect(() => {
        async function fetchLanguage() {
            const language = await defineLocale(lang);
            const data = await AsyncStorage.getItem("data");
            setLanguage(language);
        }
        fetchLanguage();
    }, []);

    async function getFirebaseBuildsByID() {
        const uid = UIDText;

        try {
            if (uid != "") {
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

    if (colors && language) {
        return (
            <View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        position: "relative",
                        left: -36,
                        marginHorizontal: 28,
                        marginBottom: 6,
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
                        placeholder={language.uid_placeholder}
                        style={{
                            width: "100%",
                            backgroundColor: colors.subAppBackground,
                            color: colors.textColor,
                            paddingVertical: Platform.OS === "android" ? 8 : 12,
                            fontWeight: "600",
                            paddingHorizontal: 6,
                            borderRadius: 6,
                            paddingLeft: 44,
                        }}
                        onChangeText={handleFieldChange}
                        value={UIDText}
                        maxLength={24}
                    ></TextInput>
                </View>
                <Text
                    style={{
                        color: colors.textSubColor,
                        marginHorizontal: 35,
                        marginBottom: 6,
                        fontWeight: 600,
                    }}
                >
                    {language.uid_message}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        getFirebaseBuildsByID();
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginHorizontal: 16,
                            marginBottom: 14,
                        }}
                    >
                        <View
                            style={{
                                borderRadius: 6,
                                width: "95%",
                                backgroundColor: colors.subAppBackground,
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.accent,
                                    fontWeight: 600,
                                    fontSize: 15,
                                }}
                            >
                                {language.import_button}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ImportByUIDComponent;
