import AsyncStorage from "@react-native-async-storage/async-storage";

const BuildCost = async () => {
    let buildPrice = 0;
    const a = await AsyncStorage.getItem("CPU").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const b = await AsyncStorage.getItem("GPU").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const c = await AsyncStorage.getItem("Motherboard").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const d = await AsyncStorage.getItem("RAM").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const e = await AsyncStorage.getItem("drive1").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const f = await AsyncStorage.getItem("PSU").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    const g = await AsyncStorage.getItem("Case").then((res) => {
        const str = JSON.parse(res);
        if (str?.price) {
            buildPrice += str?.price;
        }
    });
    return buildPrice;
};

export default BuildCost;
