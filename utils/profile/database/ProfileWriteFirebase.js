import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../utils/Firebase";
import { ref, set } from "firebase/database";

export const ProfileWriteFirebase = async (BuildNameField) => {
    const raw = await AsyncStorage.getItem("data");

    const cpu = await AsyncStorage.getItem("CPU");
    const gpu = await AsyncStorage.getItem("GPU");
    const ram = await AsyncStorage.getItem("RAM");
    const motherboard = await AsyncStorage.getItem("Motherboard");
    const ssd = await AsyncStorage.getItem("drive1");
    const pc_case = await AsyncStorage.getItem("Case");
    const psu = await AsyncStorage.getItem("PSU");

    const buildName = BuildNameField;

    const data = JSON.parse(raw);
    const uid = data.uid;

    try {
        if (!BuildNameField) {
            set(ref(db, `/${uid}/default`), {
                uid,
                cpu,
                gpu,
                ram,
                motherboard,
                ssd,
                pc_case,
                psu,
            });
        } else {
            set(ref(db, `/${uid}/${buildName}`), {
                uid,
                cpu,
                gpu,
                ram,
                motherboard,
                ssd,
                pc_case,
                psu,
            });
        }
    } catch (e) {
        console.log(e);
    }
};
