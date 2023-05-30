import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import colors from "../utils/theme/darkColors";

const LoadingLocale = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                backgroundColor: colors.appBackground,
            }}
        >
            <ActivityIndicator style={{ marginBottom: 16 }} />
            <Text style={{ fontWeight: "600", color: colors.textSubColor }}>
                Loading locale
            </Text>
        </View>
    );
};

export default LoadingLocale;
