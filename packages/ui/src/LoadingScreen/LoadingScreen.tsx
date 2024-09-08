import ActivityIndicator from "../ActivityIndicator";
import Screen from "../Screen/Screen";

const LoadingScreen = () => {
  return (
    <Screen
      justifyContent="center"
      alignItems="center"
      backgroundColor={"transitionScreen"}
    >
      <ActivityIndicator size={"large"} />
    </Screen>
  );
};

export default LoadingScreen;
