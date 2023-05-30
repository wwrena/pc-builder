import { View, Text, Platform, AppState } from "react-native";
import { useEffect, useState } from "react";
import { detectTheme } from "../utils/theme/detectTheme";

export const TagComponent = ({ TagText }) => {
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
    if (!colors) {
        return;
    }
    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.tag_background,
                paddingHorizontal: 14,
                borderRadius: 6,
                marginRight: 6,
            }}
        >
            <Text
                style={{
                    paddingVertical: Platform.OS === "android" ? 6 : 8,
                    fontWeight: "600",
                    color: colors.accent,
                }}
            >
                {TagText}
            </Text>
        </View>
    );
};
