import AsyncStorage from "@react-native-async-storage/async-storage";

export const SSDRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("drive1");
    return {
        name: null,
        tags: null,
    };
};
