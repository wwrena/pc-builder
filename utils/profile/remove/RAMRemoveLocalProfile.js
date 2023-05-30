import AsyncStorage from "@react-native-async-storage/async-storage";

export const RAMRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("RAM");
    return {
        name: null,
        tags: null,
    };
};
