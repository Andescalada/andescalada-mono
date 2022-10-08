import { MMKV } from "react-native-mmkv";

const permissionStorage = new MMKV({ id: "permission" });

export default permissionStorage;
