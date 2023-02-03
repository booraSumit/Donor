import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({ name, size = 40, iconColor = "#fff", bgColor = "#000" }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} size={size * 0.5} color={iconColor} />
    </View>
  );
}

export default Icon;
