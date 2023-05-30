import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { detectTheme } from "../utils/theme/detectTheme";

const HeaderText = ({ text }) => {
    const [colors, setColors] = useState();
    useEffect(() => {
        detectTheme().then((res) => {
            setColors(res.default);
        });
    });
    if (!colors) {
        return;
    }
    return (
        <View style={{ maxWidth: 300 }}>
            <Text
                style={{
                    fontWeight: "700",
                    fontSize: 24,
                    color: colors.textColor,
                }}
                numberOfLines={1}
            >
                {text}
            </Text>
        </View>
    );
};

export default HeaderText;
