import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary", fill = false, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: fill ? colors[color] : "transparent" },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[styles.text, { color: fill ? colors.white : colors.primary }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
