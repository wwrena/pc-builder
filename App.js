import Root from "./Screens/Root";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Screens/Profile/Profile";
import CPU from "./Screens/parts/CPU";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message";
import Register from "./Screens/Register";
import Settings from "./Screens/Profile/Settings";
import CpuHelper from "./Screens/parts/helpers/CpuHelper";
import GPU from "./Screens/parts/GPU";
import GpuHelper from "./Screens/parts/helpers/GpuHelper";
import Motherboard from "./Screens/parts/Motherboard";
import MotherboardHelper from "./Screens/parts/helpers/MotherboardHelper";
import RAM from "./Screens/parts/RAM";
import RAMHelper from "./Screens/parts/helpers/RAMHelper";
import SSD from "./Screens/parts/SSD";
import SSDHelper from "./Screens/parts/helpers/SSDHelper";
import { detectTheme } from "./utils/theme/detectTheme";
import { useState, useEffect } from "react";
import Case from "./Screens/parts/Case";
import PSU from "./Screens/parts/PSU";
import PSUHelper from "./Screens/parts/helpers/PSUHelper";
import CaseHelper from "./Screens/parts/helpers/CaseHelper";
import { AppState, LogBox } from "react-native";

export default function App() {
    const Stack = createNativeStackNavigator();
    const showHeader = false;
    const [colors, setColors] = useState();
    LogBox.ignoreAllLogs(["Warning: ..."]);
    LogBox.ignoreAllLogs();
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
    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{
                    borderLeftColor: colors.accent,
                    width: "95%",
                    backgroundColor: colors.subAppBackground,
                }}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.textColor,
                }}
                text2Style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: colors.textSubColor,
                }}
            />
        ),
        error: (props) => (
            <BaseToast
                {...props}
                style={{
                    borderLeftColor: colors.red,
                    width: "95%",
                    backgroundColor: colors.subAppBackground,
                }}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                }}
                text1Style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.textColor,
                }}
                text2Style={{
                    fontWeight: "600",
                    fontSize: 14,
                }}
            />
        ),
    };

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginScreen"
                        component={Root}
                        options={{
                            headerShown: showHeader,
                            gestureEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="CPU"
                        component={CPU}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="GPU"
                        component={GPU}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="RAM"
                        component={RAM}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="SSD"
                        component={SSD}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="Motherboard"
                        component={Motherboard}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="PSU"
                        component={PSU}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="Case"
                        component={Case}
                        options={{ headerShown: showHeader }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerShown: showHeader,
                            gestureEnabled: false,
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="CpuHelper"
                        component={CpuHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="GpuHelper"
                        component={GpuHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="MotherboardHelper"
                        component={MotherboardHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="RAMHelper"
                        component={RAMHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="SSDHelper"
                        component={SSDHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="PSUHelper"
                        component={PSUHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                    <Stack.Screen
                        name="CaseHelper"
                        component={CaseHelper}
                        options={{
                            headerShown: showHeader,
                            presentation: "modal",
                            modalPresentationStyle: "overFullScreen",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast config={toastConfig} topOffset={50} />
        </>
    );
}
