import AsyncStorage from "@react-native-async-storage/async-storage";

export const CpuRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("CPU");
    return {
        name: null,
        tags: null,
    };
};
