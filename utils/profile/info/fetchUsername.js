import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUsername = async () => {
    const username = await AsyncStorage.getItem("username");
    return username;
};
