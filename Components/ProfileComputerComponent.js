import React, { useState, useRef, useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    PanResponder,
    Animated,
    NativeModules,
    Platform,
    Easing,
    AppState,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { defineLocale } from "../utils/locale/defineLocale";
import LoadingLocale from "./LoadingLocale";
import { TranslateComponentType } from "../utils/profile/TranslateComponentType";
import { detectTheme } from "../utils/theme/detectTheme";

const ProfileComputerComponent = ({
    ComponentType,
    ComponentLocalizedType,
    LocalizedComponentName,
    updateBuildPrice,
}) => {
    const navigation = useNavigation();

    const [ComponentName, setComponentName] = useState();
    const [ComponentTags, setComponentTags] = useState();
    const [LocalizedType, setLocalizedType] = useState("");

    const pan = useRef(new Animated.ValueXY()).current;

    const [language, setLanguage] = useState(null);
    let lang = "en";
    if (Platform.OS === "ios") {
        lang = NativeModules.SettingsManager.settings.AppleLocale.split("_")[0];
    } else if (Platform.OS === "android") {
        lang = NativeModules.I18nManager.localeIdentifier.split("_")[0];
    }

    const [colors, setColors] = useState();

    useEffect(() => {
        updateBuildPrice();
    });

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
        TranslateComponentType({ ComponentLocalizedType, lang }).then(
            (response) => {
                setLocalizedType(response);
            }
        );
    }, []);

    async function globalfetchLanguage() {
        const res = await defineLocale(lang);
        return res;
    }

    useEffect(() => {
        async function fetchLanguage() {
            const res = await defineLocale(lang);
            setLanguage(res);
        }
        fetchLanguage();
    });

    async function cpuRemoveProfile() {
        const { CpuRemoveLocalProfile } = await import(
            "../utils/profile/remove/CpuRemoveLocalProfile"
        );
        await CpuRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function gpuRemoveProfile() {
        const { GpuRemoveLocalProfile } = await import(
            "../utils/profile/remove/GpuRemoveLocalProfile"
        );
        await GpuRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function RamRemoveProfile() {
        const { RAMRemoveLocalProfile } = await import(
            "../utils/profile/remove/RAMRemoveLocalProfile"
        );
        await RAMRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function MotherboardRemoveProfile() {
        const { MotherboardRemoveLocalProfile } = await import(
            "../utils/profile/remove/MotherboardRemoveLocalProfile"
        );
        await MotherboardRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function Drive1RemoveLocalProfile() {
        const { SSDRemoveLocalProfile } = await import(
            "../utils/profile/remove/SSDRemoveLocalProfile"
        );
        await SSDRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function CaseRemoveLocalProfile() {
        const { CaseRemoveLocalProfile } = await import(
            "../utils/profile/remove/CaseRemoveLocalProfile"
        );
        await CaseRemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    async function PSURemoveLocalProfile() {
        const { PSURemoveLocalProfile } = await import(
            "../utils/profile/remove/PSURemoveLocalProfile"
        );
        await PSURemoveLocalProfile();
        setComponentName();
        setComponentTags();
    }

    useFocusEffect(
        React.useCallback(() => {
            async function getKeys() {
                if (ComponentType == "CPU") {
                    const { CpuGetLocalProfile } = await import(
                        "../utils/profile/add/CpuGetLocalProfile"
                    );
                    const cpu = await CpuGetLocalProfile(lang);
                    if (cpu?.name != null) {
                        setComponentName(cpu.name);
                        setComponentTags(cpu.tags);
                    }
                }
                if (ComponentType == "GPU") {
                    const { GpuGetLocalProfile } = await import(
                        "../utils/profile/add/GpuGetLocalProfile"
                    );
                    const gpu = await GpuGetLocalProfile(lang);
                    if (gpu?.name != null) {
                        setComponentName(gpu.name);
                        setComponentTags(gpu.tags);
                    }
                }
                if (ComponentType == "SSD") {
                    const { FirstDriveGetLocalProfile } = await import(
                        "../utils/profile/add/FirstDriveGetLocalProfile"
                    );
                    const drive = await FirstDriveGetLocalProfile(lang);
                    if (drive?.name != null) {
                        setComponentName(drive.name);
                        setComponentTags(drive.tags);
                    }
                }
                if (ComponentType == "Motherboard") {
                    const { MotherboardGetLocalProfile } = await import(
                        "../utils/profile/add/MotherboardGetLocalProfile"
                    );
                    const motherboard = await MotherboardGetLocalProfile(lang);
                    if (motherboard?.name != null) {
                        setComponentName(motherboard.name);
                        setComponentTags(motherboard.tags);
                    }
                }
                if (ComponentType == "RAM") {
                    const { RAMGetLocalProfile } = await import(
                        "../utils/profile/add/RAMGetLocalProfile"
                    );
                    const ram = await RAMGetLocalProfile(lang);
                    if (ram?.name != null) {
                        setComponentName(ram.name);
                        setComponentTags(ram.tags);
                    }
                }
                if (ComponentType == "Case") {
                    const { CaseGetLocalProfile } = await import(
                        "../utils/profile/add/CaseGetLocalProfile"
                    );
                    const pc_case = await CaseGetLocalProfile(lang);
                    if (pc_case?.name != null) {
                        setComponentName(pc_case.name);
                        setComponentTags(pc_case.tags);
                    }
                }
                if (ComponentType == "PSU") {
                    const { PSUGetLocalProfile } = await import(
                        "../utils/profile/add/PSUGetLocalProfile"
                    );
                    const psu = await PSUGetLocalProfile(lang);
                    if (psu?.name != null) {
                        setComponentName(psu.name);
                        setComponentTags(psu.tags);
                    }
                }
            }
            getKeys();
        }, [ComponentType])
    );
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: async (e, gesture) => {
                if (gesture.dx < -100) {
                    Animated.timing(pan, {
                        toValue: { x: 0, y: 0 },
                        duration: 1000,
                        easing: Easing.bezier(0, 0.58, 0, 1),
                        useNativeDriver: true,
                    }).start();
                    if (ComponentType == "CPU") {
                        cpuRemoveProfile();
                    }
                    if (ComponentType == "GPU") {
                        gpuRemoveProfile();
                    }
                    if (ComponentType == "RAM") {
                        RamRemoveProfile();
                    }
                    if (ComponentType == "Motherboard") {
                        MotherboardRemoveProfile();
                    }
                    if (ComponentType == "SSD") {
                        Drive1RemoveLocalProfile();
                    }
                    if (ComponentType == "PSU") {
                        PSURemoveLocalProfile();
                    }
                    if (ComponentType == "Case") {
                        CaseRemoveLocalProfile();
                    }
                    await globalfetchLanguage().then(async (res) => {
                        let toastText = "";
                        toastText = res;
                        await TranslateComponentType({
                            ComponentLocalizedType,
                            lang,
                        }).then((response) => {
                            if (lang == "ru") {
                                if (response.split("а ")[1] != undefined) {
                                    Toast.show({
                                        type: "success",
                                        text1: toastText.profile_done,
                                        text2: `${
                                            toastText.profile_removed_message
                                        } ${response.split("а ")[1]} ${
                                            toastText.profile_removed_message_2
                                        }`,
                                        position: "bottom",
                                    });
                                } else {
                                    Toast.show({
                                        type: "success",
                                        text1: toastText.profile_done,
                                        text2: `${toastText.profile_removed_message} ${response} ${toastText.profile_removed_message_2}`,
                                        position: "bottom",
                                    });
                                }
                            } else if (lang == "en") {
                                Toast.show({
                                    type: "success",
                                    text1: toastText.profile_done,
                                    text2: `${response.trim()} ${
                                        toastText.profile_removed_message
                                    }`,
                                    position: "bottom",
                                });
                            } else if (lang == "uk") {
                                Toast.show({
                                    type: "success",
                                    text1: toastText.profile_done,
                                    text2: `${
                                        response.charAt(0).toUpperCase() +
                                        response.slice(1)
                                    } ${toastText.profile_removed_message}`,
                                    position: "bottom",
                                });
                            }
                        });
                    });
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!language || !colors) {
        return <LoadingLocale />;
    }

    return (
        <Animated.View
            style={[
                {
                    transform: [{ translateX: pan.x }],
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: colors.subAppBackground,
                    borderRadius: 6,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                    minHeight: 54,
                },
            ]}
            {...panResponder.panHandlers}>
            {ComponentName ? (
                <>
                    <View style={{ maxWidth: "73%" }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: colors.textColor,
                            }}>
                            {LocalizedComponentName}: {ComponentName}
                        </Text>
                        {ComponentTags ? (
                            <Text
                                style={{
                                    marginTop: 2,
                                    color: "gray",
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.textSubColor,
                                }}>
                                {ComponentTags}
                            </Text>
                        ) : null}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ComponentType);
                            }}>
                            <Text
                                style={{
                                    color: colors.accent,
                                    fontWeight: 600,
                                    fontSize: 18,
                                }}>
                                {language.profile_edit_button}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: colors.textColor,
                            }}
                            numberOfLines={1}>
                            {language.profile_not_selected} {LocalizedType}{" "}
                            {language.profile_not_selected_2}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: "flex-end",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(ComponentType);
                            }}>
                            <Text
                                style={{
                                    color: colors.accent,
                                    fontWeight: 600,
                                    fontSize: 18,
                                }}>
                                {language.profile_add_button}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </Animated.View>
    );
};

export default ProfileComputerComponent;
