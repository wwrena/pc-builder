import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const Logout = async () => {
    const navigation = useNavigation();

    await AsyncStorage.removeItem("CPU");
    await AsyncStorage.removeItem("data");
    await AsyncStorage.removeItem("uid");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("kUserName");

    navigation.navigate("LoginScreen");
};
