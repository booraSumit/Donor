import React from "react";
import { TouchableOpacity } from "react-native";
import AppText from "./AppText";

function Link({ onPress, children }) {
  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
}

export default Link;
