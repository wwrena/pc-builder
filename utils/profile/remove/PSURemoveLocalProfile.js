import AsyncStorage from "@react-native-async-storage/async-storage";

export const PSURemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("PSU");
    return {
        name: null,
        tags: null,
    };
};
