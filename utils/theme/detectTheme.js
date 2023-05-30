import { Appearance } from "react-native";

export const detectTheme = async () => {
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme == "dark") {
        const theme = await import("../theme/darkColors");
        return theme;
    } else if (colorScheme == "light") {
        const theme = await import("../theme/colors");
        return theme;
    }
};
