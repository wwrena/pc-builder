import AsyncStorage from "@react-native-async-storage/async-storage";

export const MotherboardRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("Motherboard");
    return {
        name: null,
        tags: null,
    };
};
