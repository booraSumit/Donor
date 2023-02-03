import React from "react";
import LottieView from "lottie-react-native";

function SuccessIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require("../../assets/animations/success.json")}
    />
  );
}

export default SuccessIndicator;
