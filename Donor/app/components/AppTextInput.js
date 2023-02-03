import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

function AppTextInput({ icon, label, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.dark}
          style={styles.icon}
        />
      )}
      <View style={styles.fieldContainer}>
        <AppText style={styles.label}>{label}</AppText>
        <TextInput
          style={[defaultStyles.text, styles.textInput]}
          {...otherProps}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.medium,
  },
  fieldContainer: {
    paddingHorizontal: 18,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  textInput: {
    paddingVertical: 4,
    width: "100%",
    color: colors.veryDark,
  },
  icon: {
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderColor: colors.medium,
  },
});

export default AppTextInput;
