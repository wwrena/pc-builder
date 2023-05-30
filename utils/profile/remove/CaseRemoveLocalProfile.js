import AsyncStorage from "@react-native-async-storage/async-storage";

export const CaseRemoveLocalProfile = async () => {
    await AsyncStorage.removeItem("Case");
    return {
        name: null,
        tags: null,
    };
};
