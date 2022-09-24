import Constants, { AppOwnership } from "expo-constants";

const isExpoGo = Constants.appOwnership === AppOwnership.Expo;

export default isExpoGo;
