import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import {
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    NativeModules,
    TextInput,
    ScrollView,
    Platform,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { defineLocale } from "../../utils/locale/defineLocale";
import Icon from "react-native-vector-icons/FontAwesome";
import { TagComponent } from "../../Components/TagComponent";
import HeaderText from "../../Components/ComponentsListHeader";
import { detectTheme } from "../../utils/theme/detectTheme";

const SSD = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const input = useRef(null);

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

    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/actuallynotrena/switchblade-data/master/ssd.json"
        )
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    _dispatch = () => {
        navigation.navigate("Profile");
    };

    _getItem = async (item) => {
        await AsyncStorage.setItem("drive1", JSON.stringify(item));
        Toast.show({
            type: "success",
            text1: `${language.cpu_toast_header} 👍`,
            text2: `${language.cpu_toast_added_text_1} ${item.name} ${language.cpu_toast_added_text_2}`,
            onPress: _dispatch(),
            position: "bottom",
        });
    };

    const [SearchText, setSearchText] = useState("");

    function handleFieldChange(e) {
        setSearchText(e);
    }

    const renderItem = ({ item }) => (
        <View
            key={item.id}
            style={{
                backgroundColor: colors.subAppBackground,
                borderRadius: 6,
                marginBottom: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <View style={{ maxWidth: "72%" }}>
                <Text
                    style={{
                        fontWeight: "600",
                        fontSize: 16,
                        marginBottom: 4,
                        color: colors.textColor,
                    }}
                >
                    {item.name}
                </Text>
                <Text
                    style={{
                        fontWeight: "600",
                        color: colors.textSubColor,
                    }}
                >
                    {item.capacity ? item.capacity : ""}
                    {item.form_factor ? ` - ${item.form_factor}` : ""}
                    {item.price
                        ? ` - ${item.price} UAH (${Math.round(
                              item.price / 32.84
                          )}$)`
                        : null}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    _getItem(item);
                }}
            >
                <View>
                    <Text
                        style={{
                            color: colors.accent,
                            fontWeight: "600",
                            fontSize: 16,
                        }}
                    >
                        {language.profile_add_button}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    let filteredData = "";

    if (SearchText.startsWith("capacity:")) {
        filteredData = data.filter((item) => {
            const capacity = item.capacity || "";
            if (SearchText.split(":")[1] == "") {
                return false;
            } else {
                return capacity
                    .toLowerCase()
                    .includes(SearchText.split(":")[1].toLowerCase());
            }
        });
    } else if (SearchText.startsWith("form_factor:")) {
        filteredData = data.filter((item) => {
            const form_factor = item.form_factor || "";
            if (SearchText.split(":")[1] == "") {
                return false;
            } else {
                return form_factor
                    .toLowerCase()
                    .includes(SearchText.split(":")[1].toLowerCase());
            }
        });
    } else if (SearchText.startsWith("min_price:")) {
        input.current.focus();
        filteredData = data
            .filter((item) => {
                const price = item.price || "";
                if (SearchText.split(":")[1] == "") {
                    return false;
                } else {
                    if (SearchText.split(":")[1] < price) {
                        return item.price;
                    }
                }
            })
            .sort((a, b) => a.price - b.price);
    } else if (SearchText.startsWith("max_price:")) {
        input.current.focus();
        filteredData = data
            .filter((item) => {
                const price = item.price || "";
                if (SearchText.split(":")[1] == "") {
                    return false;
                } else {
                    if (SearchText.split(":")[1] > price) {
                        return item.price;
                    }
                }
            })
            .sort((a, b) => a.price - b.price);
    } else {
        filteredData = data.filter((item) => {
            return item.name.toLowerCase().includes(SearchText.toLowerCase());
        });
    }

    if (!language || !colors) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.appBackground,
                }}
            >
                <ActivityIndicator size="small" color="#a29cf4" />
                <Text
                    style={{
                        marginTop: 10,
                        fontWeight: 600,
                        color: colors.textSubColor,
                    }}
                >
                    Loading locale
                </Text>
            </View>
        );
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView
                    style={{
                        backgroundColor: colors.appBackground,
                        paddingHorizontal: 12,
                        height: "100%",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 12,
                            marginLeft: 12,
                            marginRight: 18,
                            justifyContent: "space-between",
                        }}
                    >
                        <HeaderText text={language.ssd_screen_header} />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SSDHelper");
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.accent,
                                }}
                            >
                                {language.cpu_filter_button}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            position: "relative",
                            left: -32,
                        }}
                    >
                        <Icon
                            name="search"
                            color="rgba(80,80,80,1)"
                            size={16}
                            style={{
                                marginRight: 16,
                                position: "relative",
                                right: -44,
                                zIndex: 999,
                            }}
                        />
                        <TextInput
                            placeholderTextColor="gray"
                            ref={input}
                            clearButtonMode="always"
                            placeholder={language.search_placeholder}
                            style={{
                                width: "100%",
                                backgroundColor: colors.subAppBackground,
                                color: colors.textColor,
                                paddingVertical:
                                    Platform.OS === "android" ? 6 : 10,
                                fontWeight: "600",
                                paddingHorizontal: 6,
                                borderRadius: 6,
                                paddingLeft: 44,
                            }}
                            onChangeText={handleFieldChange}
                            value={SearchText}
                        ></TextInput>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            marginVertical: 8,
                            zIndex: 999,
                            minHeight: 32,
                            maxHeight: 36,
                            borderRadius: 6,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setSearchText("form_factor:M.2")}
                        >
                            <TagComponent TagText="M.2 SSD" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("capacity:240GB")}
                        >
                            <TagComponent TagText="240 GB" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("capacity:480GB")}
                        >
                            <TagComponent TagText="480 GB" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("capacity:1TB")}
                        >
                            <TagComponent TagText="1TB" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("capacity:2TB")}
                        >
                            <TagComponent TagText="2TB" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("min_price:")}
                        >
                            <TagComponent TagText="min_price:" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSearchText("max_price:")}
                        >
                            <TagComponent TagText="max_price:" />
                        </TouchableOpacity>
                    </ScrollView>
                    {filteredData.length ? (
                        <FlatList
                            data={filteredData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            initialNumToRender={10}
                        />
                    ) : (
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                            }
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                            }}
                        >
                            {SearchText ? (
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "gray",
                                            fontWeight: "600",
                                            fontSize: 16,
                                        }}
                                    >
                                        {language.search_no_results_found_1}{" "}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: "black",
                                            fontWeight: "600",
                                            color: colors.textColor,
                                        }}
                                    >
                                        {SearchText}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "gray",
                                            fontWeight: "600",
                                            fontSize: 16,
                                        }}
                                    >
                                        {language.search_no_results_found_2}
                                    </Text>
                                </View>
                            ) : (
                                <>
                                    <ActivityIndicator />
                                    <Text
                                        style={{
                                            fontWeight: "600",
                                            fontSize: 16,
                                            color: colors.textSubColor,
                                            marginTop: 8,
                                        }}
                                    >
                                        {language.loading_indicate_text}
                                    </Text>
                                </>
                            )}
                        </KeyboardAvoidingView>
                    )}
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
};

export default SSD;
