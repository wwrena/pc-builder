import AsyncStorage from "@react-native-async-storage/async-storage";

export const GpuRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("GPU");
    return {
        name: null,
        tags: null,
    };
};
